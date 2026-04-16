async function responder() {
  let pergunta = document.getElementById("pergunta").value;

  document.getElementById("resposta").innerText = "Pensando... 🤖";

  const resposta = await fetch("/api/ia", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ pergunta })
  });

  const data = await resposta.json();

  document.getElementById("resposta").innerText = data.resposta;
}
