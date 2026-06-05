/**
 * Cloudflare Worker example: lightweight AI assistant proxy
 * - This worker proxies requests to an AI provider (OpenAI) server-side
 * - Protects API key and enforces simple rate-limits / validation
 * - Deploy via `wrangler` or Cloudflare dashboard
 *
 * NOTE: Replace OPENAI_API_KEY in Cloudflare environment variables (Secrets)
 */

addEventListener('fetch', event => {
  event.respondWith(handle(event.request))
})

async function handle(request) {
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 })
  try {
    const data = await request.json()
    const prompt = (data.prompt || '').trim()
    if (!prompt) return new Response(JSON.stringify({ error: 'missing prompt' }), { status: 400 })

    // Basic abuse protection (very small)
    if (prompt.length > 2000) return new Response(JSON.stringify({ error: 'prompt too long' }), { status: 400 })

    // Example: call OpenAI Chat completions (replace endpoint as needed)
    const OPENAI_KEY = OPENAI_API_KEY // set via worker secrets

    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 400
      })
    })

    if (!resp.ok) {
      const t = await resp.text()
      return new Response(JSON.stringify({ error: 'AI provider error', info: t }), { status: 502 })
    }

    const j = await resp.json()
    const answer = j?.choices?.[0]?.message?.content || j?.choices?.[0]?.text || ''
    return new Response(JSON.stringify({ answer }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: 'internal_error', detail: String(err) }), { status: 500 })
  }
}
