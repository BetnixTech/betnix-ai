import fetch from "node-fetch";

export default async function handler(req, res) {
  const { audio_url } = req.body; // e.g., URL of an audio file
  const ASSEMBLYAI_KEY = process.env.ASSEMBLYAI_KEY;

  try {
    const response = await fetch("https://api.assemblyai.com/v2/transcript", {
      method: "POST",
      headers: {
        "Authorization": ASSEMBLYAI_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ audio_url })
    });

    const data = await response.json();
    // You can return the transcript ID or result here
    res.status(200).json({ transcriptId: data.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ text: "AssemblyAI API error" });
  }
}
