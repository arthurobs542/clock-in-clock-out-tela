fetch("./funcionarios.json")
  .then((resposta) => resposta.json())
  .then((dados) => {
    // A variável 'dados' é um array de funcionários
    const funcionario = dados[0]; // Exibe o primeiro, por exemplo

    // Atualiza os elementos na tela
    document.getElementById("foto-usuario").src = funcionario.foto;
    document.getElementById("nome-usuario").textContent = funcionario.nome;
    document.getElementById(
      "id-usuario"
    ).textContent = `id: ${funcionario.numero}`;
  })
  .catch((erro) => console.error("Erro ao carregar JSON:", erro));
