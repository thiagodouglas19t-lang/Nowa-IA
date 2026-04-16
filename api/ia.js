export default async function handler(req, res) {
  const { pergunta } = req.body;

  const resposta = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Você é uma IA inteligente dentro de um app pessoal." },
        { role: "user", content: pergunta }
      ]
    })
  });

  const data = await resposta.json();

  res.status(200).json({
    resposta: data.choices[0].message.content
  });
}
