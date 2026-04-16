const API_KEY = "COLOCA_SUA_CHAVE_AQUI";

function abrirJogos() {
  document.getElementById("conteudo").innerHTML =
    "<h2>Jogos ⚽</h2><p>Em breve jogos reais...</p>";
}

function abrirIA() {
  document.getElementById("conteudo").innerHTML = `
    <h2>IA 🤖</h2>
    <input id="pergunta" placeholder="Fala comigo..." />
    <br><br>
    <button onclick="perguntarIA()">Perguntar</button>
    <p id="resposta"></p>
  `;
}

async function perguntarIA() {
  const pergunta = document.getElementById("pergunta").value;

  document.getElementById("resposta").innerText = "Pensando... 🤔";

  const resposta = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + API_KEY
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Você é um assistente inteligente dentro de um app pessoal." },
        { role: "user", content: pergunta }
      ]
    })
  });

  const data = await resposta.json();

  document.getElementById("resposta").innerText =
    data.choices[0].message.content;
}
