'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Hidden, client-only screen-share room (no backend).
 *
 * - A shared password gates the page (checked client-side against a SHA-256
 *   hash). NOTE: client-side gating only deters casual visitors — the hash and
 *   logic ship in the bundle, so it is NOT real security. Use a strong password
 *   and treat the URL as semi-secret.
 * - The call itself is peer-to-peer WebRTC. Since there is no signaling server,
 *   the two people exchange a connection "code" once by hand (paste it into any
 *   chat). After that, screen/audio flows directly between the two browsers.
 * - Public STUN is used for NAT traversal (a standard free service, not a
 *   backend you run). Very restrictive networks that need a TURN relay may fail.
 */

// SHA-256 of the access password. Default is sha256("changeme").
// To change it: run  printf 'YOURPASSWORD' | shasum -a 256   and paste the hash.
const ACCESS_HASH = '057ba03d6c44104863dc7361fe4578965d1887360f90a0895882e58a6248fc86';

const ICE_SERVERS: RTCIceServer[] = [
  { urls: 'stun:stun.l.google.com:19302' },
  { urls: 'stun:stun1.l.google.com:19302' },
];

async function sha256Hex(text: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

const encodeDesc = (d: RTCSessionDescription | null) => btoa(JSON.stringify(d));
const decodeDesc = (code: string) => JSON.parse(atob(code.trim())) as RTCSessionDescriptionInit;

// Wait until ICE candidate gathering finishes (so the whole connection fits in
// one copy-paste), with a safety timeout for slow/again networks.
function waitForIceGathering(pc: RTCPeerConnection, timeoutMs = 3000): Promise<void> {
  if (pc.iceGatheringState === 'complete') return Promise.resolve();
  return new Promise((resolve) => {
    const done = () => {
      pc.removeEventListener('icegatheringstatechange', check);
      resolve();
    };
    const check = () => {
      if (pc.iceGatheringState === 'complete') done();
    };
    pc.addEventListener('icegatheringstatechange', check);
    setTimeout(done, timeoutMs);
  });
}

type Role = 'none' | 'host' | 'guest';
type Status = 'idle' | 'working' | 'awaiting-reply' | 'connecting' | 'connected' | 'failed';

export default function PrivateRoom() {
  const [unlocked, setUnlocked] = useState(false);
  const [pw, setPw] = useState('');
  const [pwError, setPwError] = useState('');

  const [role, setRole] = useState<Role>('none');
  const [status, setStatus] = useState<Status>('idle');
  const [localCode, setLocalCode] = useState(''); // code to send to the other person
  const [remoteCode, setRemoteCode] = useState(''); // code pasted from the other person
  const [sharing, setSharing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const pcRef = useRef<RTCPeerConnection | null>(null);
  const videoSenderRef = useRef<RTCRtpSender | null>(null);
  const audioSenderRef = useRef<RTCRtpSender | null>(null);
  const screenStreamRef = useRef<MediaStream | null>(null);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (sessionStorage.getItem('pr_ok') === '1') setUnlocked(true);
  }, []);

  const submitPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwError('');
    if ((await sha256Hex(pw)) === ACCESS_HASH) {
      sessionStorage.setItem('pr_ok', '1');
      setUnlocked(true);
    } else {
      setPwError('Incorrect password.');
    }
  };

  const teardown = useCallback(() => {
    screenStreamRef.current?.getTracks().forEach((t) => t.stop());
    screenStreamRef.current = null;
    pcRef.current?.close();
    pcRef.current = null;
    videoSenderRef.current = null;
    audioSenderRef.current = null;
    if (localVideoRef.current) localVideoRef.current.srcObject = null;
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
    setSharing(false);
  }, []);

  useEffect(() => () => teardown(), [teardown]);

  // Create the peer connection with two pre-negotiated transceivers, so either
  // side can start/stop screen sharing later via replaceTrack (no renegotiation).
  const createPeer = useCallback(() => {
    const pc = new RTCPeerConnection({ iceServers: ICE_SERVERS });
    const videoTx = pc.addTransceiver('video', { direction: 'sendrecv' });
    const audioTx = pc.addTransceiver('audio', { direction: 'sendrecv' });
    videoSenderRef.current = videoTx.sender;
    audioSenderRef.current = audioTx.sender;

    pc.ontrack = (ev) => {
      if (remoteVideoRef.current && ev.streams[0]) {
        remoteVideoRef.current.srcObject = ev.streams[0];
      }
    };
    pc.onconnectionstatechange = () => {
      const s = pc.connectionState;
      if (s === 'connected') setStatus('connected');
      else if (s === 'failed' || s === 'disconnected' || s === 'closed') setStatus('failed');
    };
    pcRef.current = pc;
    return pc;
  }, []);

  // HOST: create the invite code.
  const startHost = async () => {
    try {
      setError('');
      setRole('host');
      setStatus('working');
      const pc = createPeer();
      await pc.setLocalDescription(await pc.createOffer());
      await waitForIceGathering(pc);
      setLocalCode(encodeDesc(pc.localDescription));
      setStatus('awaiting-reply');
    } catch (err) {
      setError('Could not start the call. ' + (err instanceof Error ? err.message : ''));
      setStatus('failed');
    }
  };

  // HOST: apply the reply code from the guest to finish connecting.
  const applyReply = async () => {
    try {
      setError('');
      setStatus('connecting');
      await pcRef.current!.setRemoteDescription(decodeDesc(remoteCode));
    } catch {
      setError('That reply code looks invalid. Ask them to copy it again.');
      setStatus('awaiting-reply');
    }
  };

  // GUEST: paste the host's invite code, produce a reply code.
  const joinAsGuest = async () => {
    try {
      setError('');
      setRole('guest');
      setStatus('working');
      const pc = createPeer();
      await pc.setRemoteDescription(decodeDesc(remoteCode));
      await pc.setLocalDescription(await pc.createAnswer());
      await waitForIceGathering(pc);
      setLocalCode(encodeDesc(pc.localDescription));
      setStatus('connecting'); // connects once the host applies this reply
    } catch {
      setError('That invite code looks invalid. Ask them to copy it again.');
      setRole('none');
      setStatus('idle');
    }
  };

  const shareScreen = async () => {
    try {
      setError('');
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
      screenStreamRef.current = stream;
      const vTrack = stream.getVideoTracks()[0];
      const aTrack = stream.getAudioTracks()[0];
      if (vTrack) await videoSenderRef.current?.replaceTrack(vTrack);
      if (aTrack) await audioSenderRef.current?.replaceTrack(aTrack);
      if (localVideoRef.current) localVideoRef.current.srcObject = stream;
      setSharing(true);
      // When the user clicks the browser's "Stop sharing" bar.
      vTrack?.addEventListener('ended', stopScreen);
    } catch {
      // user cancelled the picker — no-op
    }
  };

  const stopScreen = async () => {
    screenStreamRef.current?.getTracks().forEach((t) => t.stop());
    screenStreamRef.current = null;
    await videoSenderRef.current?.replaceTrack(null);
    await audioSenderRef.current?.replaceTrack(null);
    if (localVideoRef.current) localVideoRef.current.srcObject = null;
    setSharing(false);
  };

  const hangUp = () => {
    teardown();
    setRole('none');
    setStatus('idle');
    setLocalCode('');
    setRemoteCode('');
    setError('');
  };

  const copyCode = async () => {
    await navigator.clipboard.writeText(localCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // ---- password screen ----
  if (!unlocked) {
    return (
      <main style={S.page}>
        <form onSubmit={submitPassword} style={S.gateCard}>
          <div style={S.lock}>🔒</div>
          <h1 style={S.gateTitle}>Private Room</h1>
          <p style={S.gateSub}>Enter the shared password to continue.</p>
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="Password"
            autoFocus
            style={S.input}
          />
          {pwError && <div style={S.err}>{pwError}</div>}
          <button type="submit" style={S.primaryBtn}>Enter</button>
        </form>
      </main>
    );
  }

  // ---- room ----
  const statusLabel: Record<Status, string> = {
    idle: 'Not connected',
    working: 'Preparing…',
    'awaiting-reply': 'Waiting for their reply code',
    connecting: 'Connecting…',
    connected: 'Connected',
    failed: 'Connection lost',
  };

  return (
    <main style={S.page}>
      <div style={S.room}>
        <div style={S.header}>
          <div style={{ fontWeight: 700, fontSize: 18 }}>Private Room</div>
          <div style={S.statusPill(status)}>
            <span style={S.dot(status)} /> {statusLabel[status]}
          </div>
        </div>

        {/* Video area */}
        <div style={S.videos}>
          <div style={S.videoBox}>
            <video ref={remoteVideoRef} autoPlay playsInline style={S.video} />
            <div style={S.videoTag}>Them</div>
          </div>
          <div style={S.videoBox}>
            <video ref={localVideoRef} autoPlay playsInline muted style={S.video} />
            <div style={S.videoTag}>You{sharing ? ' · sharing' : ''}</div>
          </div>
        </div>

        {/* Controls / signaling */}
        {status === 'connected' ? (
          <div style={S.controls}>
            {!sharing ? (
              <button onClick={shareScreen} style={S.primaryBtn}>🖥️ Share my screen</button>
            ) : (
              <button onClick={stopScreen} style={S.secondaryBtn}>Stop sharing</button>
            )}
            <button onClick={hangUp} style={S.dangerBtn}>Hang up</button>
          </div>
        ) : role === 'none' ? (
          <div style={S.controls}>
            <button onClick={startHost} style={S.primaryBtn}>Start a call</button>
            <button onClick={joinAsGuest} style={S.secondaryBtn} disabled={!remoteCode.trim()}>
              Join a call
            </button>
            <p style={S.hint}>
              One person clicks <b>Start a call</b> and sends the code. The other pastes it below
              and clicks <b>Join a call</b>.
            </p>
            <textarea
              value={remoteCode}
              onChange={(e) => setRemoteCode(e.target.value)}
              placeholder="Paste the invite code here to join…"
              style={S.textarea}
            />
          </div>
        ) : (
          <div style={S.controls}>
            {localCode && (
              <>
                <label style={S.label}>
                  {role === 'host' ? '1 · Send this invite code to them' : 'Send this reply code back to them'}
                </label>
                <textarea readOnly value={localCode} style={S.textarea} onFocus={(e) => e.target.select()} />
                <button onClick={copyCode} style={S.secondaryBtn}>{copied ? 'Copied ✓' : 'Copy code'}</button>
              </>
            )}
            {role === 'host' && (
              <>
                <label style={S.label}>2 · Paste their reply code, then connect</label>
                <textarea
                  value={remoteCode}
                  onChange={(e) => setRemoteCode(e.target.value)}
                  placeholder="Paste the reply code here…"
                  style={S.textarea}
                />
                <button onClick={applyReply} style={S.primaryBtn} disabled={!remoteCode.trim()}>Connect</button>
              </>
            )}
            {role === 'guest' && status === 'connecting' && (
              <p style={S.hint}>Reply code ready — send it to the other person. You’ll connect automatically once they paste it.</p>
            )}
            <button onClick={hangUp} style={S.linkBtn}>Cancel</button>
          </div>
        )}

        {error && <div style={S.err}>{error}</div>}
      </div>
    </main>
  );
}

// ---- inline styles (self-contained dark theme) ----
const RED = '#e11d2a';
const S: Record<string, any> = {
  page: {
    minHeight: '100vh',
    background: 'radial-gradient(1200px 600px at 70% -10%, #2a0d12 0%, #0b0d12 55%)',
    color: '#e6e9ef',
    fontFamily: 'ui-sans-serif, system-ui, sans-serif',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: '24px 16px',
  },
  gateCard: {
    marginTop: '12vh',
    width: 'min(380px, 92vw)',
    background: '#12151c',
    border: '1px solid #232833',
    borderRadius: 16,
    padding: 28,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    boxShadow: '0 20px 60px rgba(0,0,0,.5)',
  },
  lock: { fontSize: 30, textAlign: 'center' },
  gateTitle: { margin: 0, fontSize: 22, textAlign: 'center' },
  gateSub: { margin: 0, textAlign: 'center', color: '#8b93a1', fontSize: 14 },
  room: {
    width: 'min(920px, 96vw)',
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  videos: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 12,
  },
  videoBox: {
    position: 'relative',
    aspectRatio: '16 / 9',
    background: '#0a0c11',
    border: '1px solid #232833',
    borderRadius: 12,
    overflow: 'hidden',
  },
  video: { width: '100%', height: '100%', objectFit: 'contain', background: '#000' },
  videoTag: {
    position: 'absolute', bottom: 8, left: 8, fontSize: 12,
    background: 'rgba(0,0,0,.6)', padding: '3px 8px', borderRadius: 6,
  },
  controls: {
    display: 'flex', flexDirection: 'column', gap: 10,
    background: '#12151c', border: '1px solid #232833', borderRadius: 12, padding: 16,
  },
  label: { fontSize: 13, color: '#8b93a1', fontWeight: 600 },
  hint: { fontSize: 13, color: '#8b93a1', margin: '2px 0' },
  input: {
    padding: '11px 14px', borderRadius: 10, border: '1px solid #2b3240',
    background: '#0b0d12', color: '#e6e9ef', fontSize: 15, outline: 'none',
  },
  textarea: {
    width: '100%', minHeight: 70, resize: 'vertical', padding: '10px 12px',
    borderRadius: 10, border: '1px solid #2b3240', background: '#0b0d12',
    color: '#cdd3dd', fontSize: 12, fontFamily: 'ui-monospace, monospace', outline: 'none',
    boxSizing: 'border-box',
  },
  primaryBtn: {
    padding: '11px 16px', borderRadius: 10, border: 'none', cursor: 'pointer',
    background: `linear-gradient(135deg, #ff4d4d, ${RED})`, color: '#fff', fontWeight: 700, fontSize: 15,
  },
  secondaryBtn: {
    padding: '11px 16px', borderRadius: 10, cursor: 'pointer',
    background: '#1b2029', color: '#e6e9ef', border: '1px solid #2b3240', fontWeight: 600, fontSize: 15,
  },
  dangerBtn: {
    padding: '11px 16px', borderRadius: 10, cursor: 'pointer',
    background: 'transparent', color: '#ff6b6b', border: '1px solid #5a2b2b', fontWeight: 600, fontSize: 15,
  },
  linkBtn: {
    padding: '6px', borderRadius: 8, cursor: 'pointer',
    background: 'transparent', color: '#8b93a1', border: 'none', fontSize: 13, alignSelf: 'flex-start',
  },
  err: { color: '#ff8a8a', fontSize: 13 },
  statusPill: (s: Status) => ({
    display: 'flex', alignItems: 'center', gap: 7, fontSize: 13,
    padding: '5px 12px', borderRadius: 999,
    background: s === 'connected' ? 'rgba(46,160,90,.15)' : '#12151c',
    border: `1px solid ${s === 'connected' ? '#2ea05a' : '#232833'}`,
    color: s === 'connected' ? '#5bd08a' : '#8b93a1',
  }),
  dot: (s: Status) => ({
    width: 8, height: 8, borderRadius: 999,
    background: s === 'connected' ? '#2ea05a' : s === 'failed' ? '#e11d2a' : '#8b93a1',
  }),
};
