import fetch from "node-fetch";

export default async function handler(req, res) {
  const { prompt } = req.body;
  const GEMINI_KEY = process.env.GEMINI_KEY;

  try {
    const response = await fetch("https://gemini2.googleapis.com/v1beta/models/gemini-2.0-flash:generateText", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GEMINI_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: {
          text: prompt
        },
        temperature: 0.7,
        maxOutputTokens: 500
      })
    });

    const data = await response.json();
    const text = data?.candidates?.[0]?.content || "No response from Gemini.";
    res.status(200).json({ text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ text: "Gemini API error" });
  }
}
