function abrirJogos() {
  document.getElementById("conteudo").innerHTML =
    "<h2>Jogos ⚽</h2><p>Barcelona 2x1 Real Madrid</p>";
}

function abrirIA() {
  document.getElementById("conteudo").innerHTML = `
    <h2>IA 🤖</h2>
    <input id="pergunta" placeholder="Pergunta..." />
    <br><br>
    <button onclick="responder()">Perguntar</button>
    <p id="resposta"></p>
  `;
}

function responder() {
  let pergunta = document.getElementById("pergunta").value.toLowerCase();

  if (pergunta.includes("hora")) {
    document.getElementById("resposta").innerText = new Date().toLocaleTimeString();
  } else {
    document.getElementById("resposta").innerText = "Não entendi 🤔";
  }
}
