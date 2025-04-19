// Função para adicionar um evento de clique
function adicionarEventoClique(id, destino) {
    const botao = document.getElementById(id);
    if (botao) {
        botao.addEventListener("click", () => window.location.href = destino);
    }
}

// Adicionando eventos de redirecionamento
adicionarEventoClique("botaoCadastro", "novoUsuario.html");
