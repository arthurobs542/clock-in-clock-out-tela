//capturando elementos
const dataCerta = document.getElementById("conteiner-full-data");
const horaCerta = document.getElementById("conteiner-hora");
const fusoHorario = document.getElementById("conteiner-fuso-horario");

//capturando botoes de clock-in/ clock-out
const clockIn = document.getElementById("btn-entrada");
const lunch = document.getElementById("btn-lunch");
const clockOut = document.getElementById("btn-saida");

const trocarUsuario = document.getElementById("trocar-usuario");

console.log(lunch);

//capturando modal
const modalLog = document.getElementById("modal-log");

let funcionarioSelecionado = null; // variável global
let emIntervalo = false; //var auxiliar

//acessando json com funcionarios

const funcionarioLogado = JSON.parse(localStorage.getItem("funcionarioLogado"));

if (funcionarioLogado) {
  funcionarioSelecionado = funcionarioLogado;

  document.getElementById("foto-usuario").src = funcionarioLogado.foto;
  document.getElementById("nome-usuario").textContent = funcionarioLogado.nome;
  document.getElementById(
    "id-usuario"
  ).textContent = `id: ${funcionarioLogado.numero}`;
  document.getElementById(
    "trocar-usuario"
  ).textContent = `você não é ${funcionarioLogado.nome} ?`;
} else {
  window.location.href = "login.html";
}

//exibe data e  horas no relogio do sistema
function atualizaDataHora() {
  const hoje = new Date();
  const dia = String(hoje.getDate()).padStart(2, "0");
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const ano = String(hoje.getFullYear());

  const dataFormatada = `Hoje é: ${dia}/${mes}/${ano}`;

  dataCerta.textContent = dataFormatada;

  const agora = new Date();
  const horas = String(agora.getHours()).padStart(2, "0");
  const minutos = String(agora.getMinutes()).padStart(2, "0");
  const segundos = String(agora.getSeconds()).padStart(2, "0");

  const horaFormatada = `${horas}:${minutos}:${segundos}`;

  horaCerta.textContent = horaFormatada;
}

//para exibir o fuso horario
function obterFusoHorario() {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  //mapeamento de zonas tecnicas para nomes familiar
  const nomesAmigaveis = {
    "America/Sao_Paulo": "Brasília/São Paulo",
    "America/Fortaleza": "Fortaleza",
    "America/Recife": "Recife",
    "America/Manaus": "Manaus",
    "America/Belem": "Belém",
    "America/Cuiaba": "Cuiabá",
    "America/Porto_Velho": "Porto Velho",
    "America/Boa_Vista": "Boa Vista",
  };

  const nomeExibicao = nomesAmigaveis[timeZone] || timeZone;
  fusoHorario.textContent = `Fuso horário: ${nomeExibicao}`;
}

setInterval(atualizaDataHora, 1000);

//eventos de registro clockIn

clockIn.addEventListener("click", () => {
  if (!funcionarioSelecionado) return alert("Funcionário não carregado!");

  const agora = new Date();
  const horas = String(agora.getHours()).padStart(2, "0");
  const minutos = String(agora.getMinutes()).padStart(2, "0");
  const segundos = String(agora.getSeconds()).padStart(2, "0");

  const mensagemClockIn = `Olá <strong>${funcionarioSelecionado.nome}</strong>,  entrada registrada às <strong>${horas}:${minutos}:${segundos}</strong> <br />
  Bom trabalho!`;

  const mensagem = document.createElement("p");
  mensagem.innerHTML = mensagemClockIn;

  modalLog.innerText = "";

  modalLog.appendChild(mensagem);

  modalLog.style.display = "flex";

  setTimeout(() => {
    modalLog.style.display = "none";
  }, 3000);
});

lunch.addEventListener("click", () => {
  if (!funcionarioSelecionado) return alert("Funcionário não carregado!");

  const agora = new Date();
  const horas = String(agora.getHours()).padStart(2, "0");
  const minutos = String(agora.getMinutes()).padStart(2, "0");
  const segundos = String(agora.getSeconds()).padStart(2, "0");

  if (!emIntervalo) {
    //inicio do intervalo
    const mensagemLunch = `Intervalo iniciado às ${horas}:${minutos}:${segundos} para ${funcionarioSelecionado.nome}`;

    const mensagem = document.createElement("p");
    mensagem.innerHTML = mensagemLunch;

    modalLog.innerText = "";

    modalLog.appendChild(mensagem);

    modalLog.style.display = "flex";

    setTimeout(() => {
      modalLog.style.display = "none";
    }, 3000);

    lunch.textContent = "Finalizar intervalo";
    lunch.classList.remove("lunch");
    lunch.classList.add("fimLunch");
  } else {
    //fim do intervalo
    const mensagemFimLunch = `Intervalo finalizado às ${horas}:${minutos}:${segundos} para ${funcionarioSelecionado.nome}`;

    const mensagem = document.createElement("p");
    mensagem.innerHTML = mensagemFimLunch;

    modalLog.innerText = "";

    modalLog.appendChild(mensagem);

    modalLog.style.display = "flex";

    setTimeout(() => {
      modalLog.style.display = "none";
    }, 3000);

    lunch.textContent = "Finalizar intervalo";
    lunch.classList.remove("fimLunch");
    lunch.classList.add("lunch");
  }

  emIntervalo = !emIntervalo; //inverte o estado
});

//eventos de registro clockOut
clockOut.addEventListener("click", () => {
  const agora = new Date();
  const horas = String(agora.getHours()).padStart(2, "0");
  const minutos = String(agora.getMinutes()).padStart(2, "0");
  const segundos = String(agora.getSeconds()).padStart(2, "0");

  const mensagemClockOut = `Olá <strong>${funcionarioSelecionado.nome}</strong>,  saída registrada às <strong>${horas}:${minutos}:${segundos}</strong><br />
  Bom descanço!`;

  const mensagem = document.createElement("p");
  mensagem.innerHTML = mensagemClockOut;

  modalLog.innerText = "";

  modalLog.appendChild(mensagem);

  modalLog.style.display = "flex";

  setTimeout(() => {
    modalLog.style.display = "none";
  }, 3000);
});

atualizaDataHora();
obterFusoHorario();
