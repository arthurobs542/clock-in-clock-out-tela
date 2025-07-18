const btnEntrar = document.getElementById("btn-entrar");
const inputNomeUsuario = document.getElementById("nome-usuario");
const inputIdUsuario = document.getElementById("numero-usuario");

let funcionarioSelecionado = null;

btnEntrar.addEventListener("click", (event) => {
  event.preventDefault();

  const nomeUsuario = inputNomeUsuario.value.trim().toLowerCase();
  const idUsuario = Number(inputIdUsuario.value.trim());

  if (!nomeUsuario || !idUsuario) {
    mostrarModalErro("Preencha todos os campos corretamente!");
    return;
  }

  fetch("./funcionarios.json")
    .then((resposta) => resposta.json())
    .then((dados) => {
      const funcionario = dados.find(
        (f) =>
          f.nome.toLowerCase() === nomeUsuario && Number(f.numero) === idUsuario
      );

      if (!funcionario) {
        mostrarModalErro("Funcionário não encontrado!");
        return;
      }

      funcionarioSelecionado = funcionario;

      // Aqui você pode atualizar a UI com os dados do funcionário, ex:
      window.location.href = "index.html";
    })
    .catch((erro) => {
      console.error("Erro ao carregar JSON:", erro);
      mostrarModalErro("Erro ao carregar dados, tente novamente.");
    });
});

function mostrarModalErro(mensagem) {
  const modalErro = document.getElementById("modal-erro");
  document.getElementById("mensagem-erro").textContent = mensagem;
  modalErro.classList.remove("hidden");

  setTimeout(() => {
    modalErro.classList.add("hidden");
  }, 2000);
}
