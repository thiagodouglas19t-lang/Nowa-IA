const API_KEY = "COLOCA_SUA_CHAVE_AQUI";

function abrirJogos() {
  document.getElementById("conteudo").innerHTML =
    "<h2>Jogos ⚽</h2><p>Barcelona 2x1 Real Madrid</p>";
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

  // COMANDOS LOCAIS (controle do app)
  if (pergunta.includes("jogo")) {
    abrirJogos();
    return;
  }

  if (pergunta.includes("hora")) {
    document.getElementById("resposta").innerText =
      new Date().toLocaleTimeString();
    return;
  }

  if (pergunta.includes("limpar")) {
    document.getElementById("conteudo").innerHTML = "";
    return;
  }

  // SE NÃO FOR COMANDO → USA IA REAL
  const resposta = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + API_KEY
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Você controla um app. Pode abrir jogos, mostrar hora e responder perguntas." },
        { role: "user", content: pergunta }
      ]
    })
  });

  const data = await resposta.json();

  document.getElementById("resposta").innerText =
    data.choices[0].message.content;
}
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}
