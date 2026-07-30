'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Hidden, client-only screen-share room (no backend).
 *
 * Security model — a per-session PIN:
 *   - The host clicks "Create a room". A random PIN is generated, and the WebRTC
 *     connection code (the "invite") is ENCRYPTED with a key derived from that
 *     PIN (PBKDF2 -> AES-256-GCM). The host shares the PIN and the invite code
 *     with the other person.
 *   - The guest can only decrypt the invite (and thus join) if they enter the
 *     correct PIN. A wrong PIN fails decryption — they cannot connect. The reply
 *     code is encrypted the same way.
 *   - So no one without the PIN can join. The media itself is always DTLS/SRTP
 *     encrypted end-to-end by the browser. There is no server: the two people
 *     exchange the encrypted code by hand (any chat), then media flows directly
 *     peer-to-peer (public STUN for NAT traversal).
 *
 * Best practice: share the PIN over a DIFFERENT channel than the invite code
 * (e.g. code by email, PIN by text). If someone gets BOTH, they could join.
 */

const ICE_SERVERS: RTCIceServer[] = [
  { urls: 'stun:stun.l.google.com:19302' },
  { urls: 'stun:stun1.l.google.com:19302' },
];

// ---- PIN + crypto helpers (Web Crypto: PBKDF2 -> AES-256-GCM) ----
const enc = new TextEncoder();
const dec = new TextDecoder();
// Unambiguous alphabet (no 0/O/1/I) for a shareable PIN.
const PIN_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

function generatePin(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(12));
  const chars = [...bytes].map((b) => PIN_ALPHABET[b % PIN_ALPHABET.length]);
  return `${chars.slice(0, 4).join('')}-${chars.slice(4, 8).join('')}-${chars.slice(8, 12).join('')}`;
}

const b64encode = (bytes: Uint8Array) => btoa(String.fromCharCode(...bytes));
function b64decode(str: string): Uint8Array {
  const bin = atob(str.trim());
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
  return arr;
}

async function deriveKey(pin: string, salt: Uint8Array): Promise<CryptoKey> {
  const base = await crypto.subtle.importKey('raw', enc.encode(pin.trim()), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: salt as BufferSource, iterations: 150000, hash: 'SHA-256' },
    base,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt'],
  );
}

async function encryptWithPin(pin: string, plaintext: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(pin, salt);
  const ct = new Uint8Array(
    await crypto.subtle.encrypt({ name: 'AES-GCM', iv: iv as BufferSource }, key, enc.encode(plaintext)),
  );
  const out = new Uint8Array(salt.length + iv.length + ct.length);
  out.set(salt, 0);
  out.set(iv, salt.length);
  out.set(ct, salt.length + iv.length);
  return b64encode(out);
}

async function decryptWithPin(pin: string, code: string): Promise<string> {
  const data = b64decode(code);
  const salt = data.slice(0, 16);
  const iv = data.slice(16, 28);
  const ct = data.slice(28);
  const key = await deriveKey(pin, salt);
  const pt = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: iv as BufferSource },
    key,
    ct as BufferSource,
  );
  return dec.decode(pt);
}

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
  const [role, setRole] = useState<Role>('none');
  const [status, setStatus] = useState<Status>('idle');
  const [pin, setPin] = useState('');
  const [localCode, setLocalCode] = useState('');
  const [remoteCode, setRemoteCode] = useState('');
  const [sharing, setSharing] = useState(false);
  const [copied, setCopied] = useState('');
  const [error, setError] = useState('');

  const pcRef = useRef<RTCPeerConnection | null>(null);
  const videoSenderRef = useRef<RTCRtpSender | null>(null);
  const audioSenderRef = useRef<RTCRtpSender | null>(null);
  const screenStreamRef = useRef<MediaStream | null>(null);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);

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

  const createPeer = useCallback(() => {
    const pc = new RTCPeerConnection({ iceServers: ICE_SERVERS });
    const videoTx = pc.addTransceiver('video', { direction: 'sendrecv' });
    const audioTx = pc.addTransceiver('audio', { direction: 'sendrecv' });
    videoSenderRef.current = videoTx.sender;
    audioSenderRef.current = audioTx.sender;
    pc.ontrack = (ev) => {
      if (remoteVideoRef.current && ev.streams[0]) remoteVideoRef.current.srcObject = ev.streams[0];
    };
    pc.onconnectionstatechange = () => {
      const s = pc.connectionState;
      if (s === 'connected') setStatus('connected');
      else if (s === 'failed' || s === 'disconnected' || s === 'closed') setStatus('failed');
    };
    pcRef.current = pc;
    return pc;
  }, []);

  // HOST: generate a PIN + encrypted invite.
  const startHost = async () => {
    try {
      setError('');
      const newPin = generatePin();
      setPin(newPin);
      setRole('host');
      setStatus('working');
      const pc = createPeer();
      await pc.setLocalDescription(await pc.createOffer());
      await waitForIceGathering(pc);
      setLocalCode(await encryptWithPin(newPin, JSON.stringify(pc.localDescription)));
      setStatus('awaiting-reply');
    } catch (err) {
      setError('Could not start the room. ' + (err instanceof Error ? err.message : ''));
      setStatus('failed');
    }
  };

  // HOST: decrypt + apply the guest's reply to finish connecting.
  const applyReply = async () => {
    try {
      setError('');
      setStatus('connecting');
      const answer = JSON.parse(await decryptWithPin(pin, remoteCode));
      await pcRef.current!.setRemoteDescription(answer);
    } catch {
      setError('Could not read that reply — check the PIN and that the reply code was pasted fully.');
      setStatus('awaiting-reply');
    }
  };

  // GUEST: decrypt the invite with the PIN, produce an encrypted reply.
  const joinAsGuest = async () => {
    try {
      setError('');
      setStatus('working');
      const offer = JSON.parse(await decryptWithPin(pin, remoteCode));
      const pc = createPeer();
      await pc.setRemoteDescription(offer);
      await pc.setLocalDescription(await pc.createAnswer());
      await waitForIceGathering(pc);
      setLocalCode(await encryptWithPin(pin, JSON.stringify(pc.localDescription)));
      setStatus('connecting');
    } catch {
      setError('Wrong PIN or invalid invite code. Double-check both and try again.');
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
      vTrack?.addEventListener('ended', stopScreen);
    } catch {
      /* user cancelled the picker */
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
    setPin('');
    setLocalCode('');
    setRemoteCode('');
    setError('');
  };

  const copy = async (text: string, which: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(which);
    setTimeout(() => setCopied(''), 1500);
  };

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
          <div style={{ fontWeight: 700, fontSize: 18 }}>🔒 Private Room</div>
          <div style={S.statusPill(status)}>
            <span style={S.dot(status)} /> {statusLabel[status]}
          </div>
        </div>

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
            <button onClick={startHost} style={S.primaryBtn}>Create a room</button>
            <button onClick={() => setRole('guest')} style={S.secondaryBtn}>Join a room</button>
            <p style={S.hint}>
              One person creates the room and shares the <b>PIN</b> and <b>invite code</b>. The
              other joins with them. Only someone with the PIN can connect.
            </p>
          </div>
        ) : role === 'host' ? (
          <div style={S.controls}>
            <div style={S.pinRow}>
              <div>
                <div style={S.label}>PIN — share this with the other person</div>
                <div style={S.pin}>{pin}</div>
              </div>
              <button onClick={() => copy(pin, 'pin')} style={S.secondaryBtn}>{copied === 'pin' ? 'Copied ✓' : 'Copy PIN'}</button>
            </div>

            <div style={S.label}>1 · Send them this invite code</div>
            <textarea readOnly value={localCode} style={S.textarea} onFocus={(e) => e.target.select()} />
            <button onClick={() => copy(localCode, 'code')} style={S.secondaryBtn}>{copied === 'code' ? 'Copied ✓' : 'Copy invite code'}</button>

            <div style={S.label}>2 · Paste their reply code, then connect</div>
            <textarea value={remoteCode} onChange={(e) => setRemoteCode(e.target.value)} placeholder="Paste the reply code here…" style={S.textarea} />
            <button onClick={applyReply} style={S.primaryBtn} disabled={!remoteCode.trim()}>Connect</button>
            <button onClick={hangUp} style={S.linkBtn}>Cancel</button>
          </div>
        ) : (
          // guest
          <div style={S.controls}>
            {status === 'connecting' && localCode ? (
              <>
                <p style={S.hint}>Send this reply code back to the host. You’ll connect automatically once they paste it.</p>
                <textarea readOnly value={localCode} style={S.textarea} onFocus={(e) => e.target.select()} />
                <button onClick={() => copy(localCode, 'reply')} style={S.secondaryBtn}>{copied === 'reply' ? 'Copied ✓' : 'Copy reply code'}</button>
                <button onClick={hangUp} style={S.linkBtn}>Cancel</button>
              </>
            ) : (
              <>
                <div style={S.label}>PIN (from the host)</div>
                <input value={pin} onChange={(e) => setPin(e.target.value)} placeholder="XXXX-XXXX-XXXX" style={S.input} />
                <div style={S.label}>Invite code (from the host)</div>
                <textarea value={remoteCode} onChange={(e) => setRemoteCode(e.target.value)} placeholder="Paste the invite code here…" style={S.textarea} />
                <button onClick={joinAsGuest} style={S.primaryBtn} disabled={!pin.trim() || !remoteCode.trim()}>Join</button>
                <button onClick={hangUp} style={S.linkBtn}>Back</button>
              </>
            )}
          </div>
        )}

        {error && <div style={S.err}>{error}</div>}
      </div>
    </main>
  );
}

const RED = '#e11d2a';
const S: Record<string, any> = {
  page: {
    minHeight: '100vh',
    background: 'radial-gradient(1200px 600px at 70% -10%, #2a0d12 0%, #0b0d12 55%)',
    color: '#e6e9ef',
    fontFamily: 'ui-sans-serif, system-ui, sans-serif',
    display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
    padding: '24px 16px',
  },
  room: { width: 'min(920px, 96vw)', display: 'flex', flexDirection: 'column', gap: 16, marginTop: 8 },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  videos: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 },
  videoBox: { position: 'relative', aspectRatio: '16 / 9', background: '#0a0c11', border: '1px solid #232833', borderRadius: 12, overflow: 'hidden' },
  video: { width: '100%', height: '100%', objectFit: 'contain', background: '#000' },
  videoTag: { position: 'absolute', bottom: 8, left: 8, fontSize: 12, background: 'rgba(0,0,0,.6)', padding: '3px 8px', borderRadius: 6 },
  controls: { display: 'flex', flexDirection: 'column', gap: 10, background: '#12151c', border: '1px solid #232833', borderRadius: 12, padding: 16 },
  pinRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' },
  pin: { fontSize: 26, fontWeight: 800, letterSpacing: 2, fontFamily: 'ui-monospace, monospace', color: '#ff8a8a' },
  label: { fontSize: 13, color: '#8b93a1', fontWeight: 600 },
  hint: { fontSize: 13, color: '#8b93a1', margin: '2px 0' },
  input: { padding: '11px 14px', borderRadius: 10, border: '1px solid #2b3240', background: '#0b0d12', color: '#e6e9ef', fontSize: 16, letterSpacing: 1, outline: 'none', fontFamily: 'ui-monospace, monospace' },
  textarea: { width: '100%', minHeight: 70, resize: 'vertical', padding: '10px 12px', borderRadius: 10, border: '1px solid #2b3240', background: '#0b0d12', color: '#cdd3dd', fontSize: 12, fontFamily: 'ui-monospace, monospace', outline: 'none', boxSizing: 'border-box' },
  primaryBtn: { padding: '11px 16px', borderRadius: 10, border: 'none', cursor: 'pointer', background: `linear-gradient(135deg, #ff4d4d, ${RED})`, color: '#fff', fontWeight: 700, fontSize: 15 },
  secondaryBtn: { padding: '11px 16px', borderRadius: 10, cursor: 'pointer', background: '#1b2029', color: '#e6e9ef', border: '1px solid #2b3240', fontWeight: 600, fontSize: 15 },
  dangerBtn: { padding: '11px 16px', borderRadius: 10, cursor: 'pointer', background: 'transparent', color: '#ff6b6b', border: '1px solid #5a2b2b', fontWeight: 600, fontSize: 15 },
  linkBtn: { padding: '6px', borderRadius: 8, cursor: 'pointer', background: 'transparent', color: '#8b93a1', border: 'none', fontSize: 13, alignSelf: 'flex-start' },
  err: { color: '#ff8a8a', fontSize: 13 },
  statusPill: (s: Status) => ({
    display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, padding: '5px 12px', borderRadius: 999,
    background: s === 'connected' ? 'rgba(46,160,90,.15)' : '#12151c',
    border: `1px solid ${s === 'connected' ? '#2ea05a' : '#232833'}`,
    color: s === 'connected' ? '#5bd08a' : '#8b93a1',
  }),
  dot: (s: Status) => ({ width: 8, height: 8, borderRadius: 999, background: s === 'connected' ? '#2ea05a' : s === 'failed' ? '#e11d2a' : '#8b93a1' }),
};
