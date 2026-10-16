# Nicholas Method 81 — Domain Rules

Reglas mandatorias para cualquier operación sobre el núcleo de cálculo y asistencia IA de Nicholas 1981:

1. **Integridad de Matrices:** NO modificar los valores de las matrices de puntuación en `src/lib/nicholas/scoringMatrices.ts` a menos que sea una corrección explícitamente solicitada con sustento en el paper original de Nicholas (1981).
2. **Determinismo:** El ranking de métodos en `calculateScores.ts` debe ser completamente determinista. En caso de empates en puntuación total, el desempate debe respetar el orden predeterminado de los métodos.
3. **Regla de Exclusión Subterránea:** Al recomendar el "método subterráneo óptimo", Open Pit debe ser estrictamente excluido del cálculo subterráneo.
4. **Respuestas del Chatbot:** El asistente de IA en `src/pages/api/chat.ts` siempre debe responder en inglés técnico, fundamentar con los puntajes numéricos obtenidos y advertir que la herramienta es un filtro técnico preliminar que no sustituye estudios de factibilidad detallados.
