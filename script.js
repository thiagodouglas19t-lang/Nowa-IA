const API_KEY = "COLOCA_SUA_CHAVE_AQUI";

function abrirJogos() {
  document.getElementById("conteudo").innerHTML =
    "<h2>Jogos ⚽</h2><p>Em breve...</p>";
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
  const pergunta = document.getElementById("pergunta").value.toLowerCase();

  document.getElementById("resposta").innerText = "Pensando... 🤔";

  if (pergunta.includes("jogo")) {
    abrirJogos();
    return;
  }

  if (pergunta.includes("hora")) {
    document.getElementById("resposta").innerText =
      new Date().toLocaleTimeString();
    return;
  }

  const resposta = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + API_KEY
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Você é um assistente dentro de um app." },
        { role: "user", content: pergunta }
      ]
    })
  });

  const data = await resposta.json();

  document.getElementById("resposta").innerText =
    data.choices[0].message.content;
}
