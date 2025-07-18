//capturando elementos
const dataCerta = document.getElementById("conteiner-full-data");
const horaCerta = document.getElementById("conteiner-hora");
const fusoHorario = document.getElementById("conteiner-fuso-horario");

//capturando botoes de clock-in/ clock-out
const clockIn = document.getElementById("btn-entrada");
const clockOut = document.getElementById("btn-saida");
console.log(clockOut);

let funcionarioSelecionado = null; // variável global
//json com funcionarios
fetch("./funcionarios.json")
  .then((resposta) => resposta.json())
  .then((dados) => {
    // A variável 'dados' é um array de funcionários
    const funcionario = dados[0]; // Exibe o primeiro, por exemplo

    funcionarioSelecionado = funcionario; // <-- CORREÇÃO AQUI ✅

    // Atualiza os elementos na tela
    document.getElementById("foto-usuario").src = funcionario.foto;
    document.getElementById("nome-usuario").textContent = funcionario.nome;
    document.getElementById(
      "id-usuario"
    ).textContent = `id: ${funcionario.numero}`;
  })
  .catch((erro) => console.error("Erro ao carregar JSON:", erro));

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

clockIn.addEventListener("click", () => {
  if (!funcionarioSelecionado) return alert("Funcionário não carregado!");

  const agora = new Date();
  const horas = String(agora.getHours()).padStart(2, "0");
  const minutos = String(agora.getMinutes()).padStart(2, "0");
  const segundos = String(agora.getSeconds()).padStart(2, "0");

  alert(
    `Olá ${funcionarioSelecionado.nome}, entrada registrada às ${horas}:${minutos}:${segundos}`
  );
});

clockOut.addEventListener("click", () => {
  const agora = new Date();
  const horas = String(agora.getHours()).padStart(2, "0");
  const minutos = String(agora.getMinutes()).padStart(2, "0");
  const segundos = String(agora.getSeconds()).padStart(2, "0");

  alert(`Saida registrada às ${horas}:${minutos}:${segundos}`);
});

atualizaDataHora();
obterFusoHorario();
