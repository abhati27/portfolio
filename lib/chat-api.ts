// Direct client for the Hugging Face Space chatbot.
//
// The Space runs Gradio 5, which exposes a simple REST + SSE queue API. We call
// it directly with fetch instead of the @gradio/client SDK — the SDK's 1.x line
// speaks the old Gradio 4 protocol and fails at config resolution against a
// Gradio 5 server (the "Failed to fetch"/CORS-looking error). Gradio 5 sends
// permissive CORS headers, so a plain browser fetch works from any origin.

export const SPACE_URL = 'https://abhati27-career-conversation-anmol.hf.space';

// One prior turn of the conversation, in the shape the Space's chat() expects.
export interface ChatTurn {
  role: 'user' | 'assistant';
  content: string;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Ask the chatbot a question and return its answer.
 *
 * The Space runs on Hugging Face's free tier and calls the free Groq API, so
 * occasional requests fail transiently: a cold start after the Space sleeps, or
 * a brief concurrency/rate-limit blip when messages come quickly. Those recover
 * on their own, so we retry a few times with backoff before surfacing an error.
 */
export async function askAnmol(message: string, history: ChatTurn[]): Promise<string> {
  const maxAttempts = 3;
  const backoffMs = [1500, 3500]; // waits before retries 2 and 3
  let lastError: unknown;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      return await attemptChat(message, history);
    } catch (err) {
      lastError = err;
      if (attempt < maxAttempts - 1) {
        await sleep(backoffMs[attempt]);
      }
    }
  }

  throw lastError instanceof Error ? lastError : new Error('The assistant is unavailable.');
}

/**
 * A single attempt at the two-step Gradio 5 queue protocol:
 *   1. POST /gradio_api/call/chat  { data: [message, history] }  -> { event_id }
 *   2. GET  /gradio_api/call/chat/<event_id>                     -> SSE result
 */
async function attemptChat(message: string, history: ChatTurn[]): Promise<string> {
  const enqueue = await fetch(`${SPACE_URL}/gradio_api/call/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: [message, history] }),
  });
  if (!enqueue.ok) {
    throw new Error(`Could not reach the assistant (HTTP ${enqueue.status}).`);
  }

  const { event_id: eventId } = await enqueue.json();
  if (!eventId) {
    throw new Error('The assistant did not return a job id.');
  }

  const result = await fetch(`${SPACE_URL}/gradio_api/call/chat/${eventId}`);
  if (!result.ok) {
    throw new Error(`Could not read the assistant's reply (HTTP ${result.status}).`);
  }

  const raw = await result.text();
  return parseSseResult(raw);
}

// Parse the SSE payload from the result stream. Gradio emits blocks like:
//   event: complete
//   data: ["<answer>"]
// or, on a server-side failure (e.g. the LLM provider is out of quota):
//   event: error
//   data: null
function parseSseResult(raw: string): string {
  let currentEvent = '';

  for (const line of raw.split('\n')) {
    if (line.startsWith('event:')) {
      currentEvent = line.slice(6).trim();
      continue;
    }
    if (!line.startsWith('data:')) continue;

    const payload = line.slice(5).trim();

    if (currentEvent === 'error') {
      throw new Error(
        'The assistant hit a server-side error. Its language-model provider may be out of quota.'
      );
    }

    if (currentEvent === 'complete') {
      const parsed = JSON.parse(payload);
      const answer = Array.isArray(parsed) ? parsed[0] : parsed;
      if (typeof answer === 'string') return answer;
      if (answer && typeof answer === 'object' && 'value' in answer) {
        return String((answer as { value: unknown }).value);
      }
      return String(answer ?? '');
    }
  }

  throw new Error('The assistant closed the connection without replying.');
}
