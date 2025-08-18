import fetch from "node-fetch";

export default async function handler(req,res){
  const { prompt } = req.body;
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method:"POST",
    headers:{
      "Authorization": `Bearer ${OPENAI_KEY}`,
      "Content-Type":"application/json"
    },
    body: JSON.stringify({model:"gpt-3.5-turbo", messages:[{role:"user",content:prompt}], max_tokens:500})
  });
  const data = await response.json();
  res.status(200).json({text:data.choices[0].message.content});
}
