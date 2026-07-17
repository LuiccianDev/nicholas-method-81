import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { message, inputs, results } = await request.json();

    if (!message) {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({
          reply:
            '⚠️ La API key de Gemini no está configurada. Agrega GEMINI_API_KEY en tu archivo .env o en las variables de entorno de Vercel.',
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const systemPrompt = `Eres un asistente experto en el "Nicholas Method 81" para selección de métodos de minería subterránea.

    Tu rol es ayudar a los usuarios a entender:
    1. Cómo funciona el método Nicholas y sus criterios de puntuación
    2. Qué significan sus inputs actuales y cómo afectan los resultados
    3. Interpretar los resultados de la calculadora
    4. Explicar los diferentes métodos de minería (Open Pit, Block Caving, Sublevel Stoping, etc.)

    Responde de forma clara, educativa y en español.
    Usa el contexto actual del usuario (inputs y resultados) para dar respuestas personalizadas.`;

    const contextSection = `
    INPUTS ACTUALES DEL USUARIO:
    ${JSON.stringify(inputs, null, 2)}

    RESULTADOS DE LA CALCULADORA:
    ${JSON.stringify(results, null, 2)}
    `;

    const { GoogleGenAI } = await import('@google/genai');

    const ai = new GoogleGenAI({ apiKey });

    const chat = ai.chats.create({
      model: 'gemini-2.0-flash',
      config: {
        systemInstruction: systemPrompt,
      },
    });

    const response = await chat.sendMessage({
      message: `${contextSection}\n\nPregunta del usuario: ${message}`,
    });

    const reply = response.text || 'Lo siento, no pude generar una respuesta.';

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(
      JSON.stringify({
        reply: '❌ Ocurrió un error al procesar tu mensaje. Intenta de nuevo.',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
