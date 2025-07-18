// const funcionario = funcionarios[0];

const conteinerFuncionarios = document.getElementById("conteiner-div-usuario");

console.log(conteinerFuncionarios);
document.getElementById("foto-usuario").src = funcionario.foto;
document.getElementById("nome-usuario").textContent = funcionario.nome;
document.getElementById("id-usuario").textContent = `id: ${funcionario.numero}`;
