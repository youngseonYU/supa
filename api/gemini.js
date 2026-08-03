/**
 * Vercel serverless proxy for Gemini.
 * The API key stays in Vercel's GEMINI_API_KEY environment variable and is
 * never sent to students' browsers or committed to Git.
 */
const MODEL_PATTERN = /^gemini-[a-z0-9.-]+$/i;

module.exports = async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: { message: "POST 요청만 사용할 수 있습니다." } });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return response.status(503).json({ error: { message: "AI 연결이 아직 설정되지 않았습니다. 관리자에게 문의해 주세요." } });
  }

  const { model, prompt } = request.body || {};
  if (!MODEL_PATTERN.test(String(model || "")) || typeof prompt !== "string" || prompt.length > 16000) {
    return response.status(400).json({ error: { message: "AI 요청 형식이 올바르지 않습니다." } });
  }

  try {
    const upstream = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey
        },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: "application/json" }
        })
      }
    );
    const payload = await upstream.json().catch(() => ({}));
    return response.status(upstream.status).json(payload);
  } catch (error) {
    console.error("Gemini proxy failed", error);
    return response.status(502).json({ error: { message: "AI 서버에 연결하지 못했습니다. 잠시 후 다시 시도해 주세요." } });
  }
}
