const now = new Date();
const dataFormatada = now.toLocaleDateString(); // formato: dd/mm/aaaa (dependendo do locale)
const horaFormatada = now.toLocaleTimeString(); // formato: hh:mm:ss
const form = document.getElementById("login-form");
const logadoDiv = document.getElementById("logadoMessage");
const emailDisplay = document.getElementById("emailDisplay");
const formsection = document.querySelector(".form-section");
const timedatelogado = document.querySelector(".timedate-logado");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // impede o envio real do formulário
  const email = document.getElementById("email").value;
  form.style.display = "none"; // esconde o formulário

  emailDisplay.textContent = email;
  logadoDiv.style.display = "flex"; // mostra a mensagem de logado
  logadoDiv.style.flexDirection = "column";
  formsection.style.display = "none";
  timedatelogado.textContent = `${dataFormatada} ${horaFormatada}`;
});
