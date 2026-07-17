import type { APIRoute } from 'astro'
import { GoogleGenAI } from '@google/genai'

const MODELS = ['gemini-2.5-flash', 'gemini-2.0-flash'] as const

// ─── Rate limiter ────────────────────────────────────────────────────────────
const WINDOW_MS = 60_000
const MAX_REQUESTS = 10

const ipLog = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const timestamps = (ipLog.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  if (timestamps.length >= MAX_REQUESTS) return true
  ipLog.set(ip, [...timestamps, now])
  return false
}

setInterval(() => {
  const now = Date.now()
  for (const [ip, timestamps] of ipLog.entries()) {
    const fresh = timestamps.filter((t) => now - t < WINDOW_MS)
    if (fresh.length === 0) ipLog.delete(ip)
    else ipLog.set(ip, fresh)
  }
}, 5 * 60_000)
// ─────────────────────────────────────────────────────────────────────────────

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  })
}

const SYSTEM_PROMPT = `Eres un asistente experto exclusivamente en el "Nicholas Method 81" para selección de métodos de minería subterránea.

Tu rol es ayudar a los usuarios a entender:
1. Cómo funciona el método Nicholas y sus criterios de puntuación
2. Qué significan sus inputs actuales y cómo afectan los resultados
3. Interpretar los resultados de la calculadora
4. Explicar los diferentes métodos de minería (Open Pit, Block Caving, Sublevel Stoping, etc.)

NO RESPONDAS preguntas sobre otros temas que no sean el Nicholas Method 81.
Si el usuario pregunta sobre otro tema, responde amablemente que solo puedes ayudar con el Nicholas Method 81 y redirige la conversación al método.
Si insisten, responde: "Solo puedo ayudarte con el Nicholas Method 81."`

export const POST: APIRoute = async ({ request }) => {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    request.headers.get('cf-connecting-ip') ??
    'unknown'

  if (isRateLimited(ip)) {
    return jsonResponse(
      { reply: '⏳ Demasiadas solicitudes. Espera un momento antes de preguntar de nuevo.' },
      429,
    )
  }

  let payload: { message?: unknown; inputs?: unknown; results?: unknown }

  try {
    payload = await request.json()
  } catch {
    return jsonResponse({ reply: '❌ El cuerpo de la solicitud no es JSON válido.' }, 400)
  }

  const { message, inputs, results } = payload

  if (typeof message !== 'string' || !message.trim()) {
    return jsonResponse({ reply: '❌ Debes escribir una pregunta.' }, 400)
  }

  const apiKey = import.meta.env.GEMINI_API_KEY || import.meta.env.GOOGLE_API_KEY

  if (!apiKey) {
    return jsonResponse(
      { reply: '⚠️ La API key de Gemini no está configurada. Agrega GEMINI_API_KEY en tu archivo .env.' },
      500,
    )
  }

  const ai = new GoogleGenAI({ apiKey })

  const contextSection = `
INPUTS ACTUALES DEL USUARIO:
${JSON.stringify(inputs ?? {}, null, 2)}

RESULTADOS DE LA CALCULADORA:
${JSON.stringify(results ?? [], null, 2)}
  `

  const fullPrompt = `${contextSection}\n\nPregunta del usuario: ${message}`

  let outputText = ''
  let lastError: unknown

  for (const model of MODELS) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: fullPrompt,
        config: {
          systemInstruction: SYSTEM_PROMPT,
        },
      })
      const text = response.text?.trim()
      if (text) {
        outputText = text
        break
      }
    } catch (err) {
      lastError = err
      const status = (err as { status?: number })?.status
      if (status === 429) {
        console.warn(`Model ${model} hit quota limit — not retrying.`)
        break
      }
      console.warn(`Model ${model} failed, trying next...`, err)
    }
  }

  if (!outputText) {
    const isQuotaError = (lastError as { status?: number })?.status === 429
    return jsonResponse(
      {
        reply: isQuotaError
          ? '⏳ La cuota de Gemini se agotó. Espera un momento y vuelve a intentar.'
          : '❌ No se pudo generar una respuesta en este momento. Intenta de nuevo.',
      },
      isQuotaError ? 429 : 502,
    )
  }

  return jsonResponse({ reply: outputText })
}
