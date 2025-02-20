//Redirecionamento temporário do botão "Entrar" na página login
document.getElementById("botaoEntrar").addEventListener("click", function(){
    window.location.href="cadastrarRoupas.html"
});

//Redirecionamento para a página de cadastro
document.getElementById("botaoCadastro").addEventListener("click", function(){
    window.location.href="novoUsuario.html"
});

// Variáveis para armazenar dados de roupas
let roupas = [];

// Função para carregar as roupas na tela
function carregarRoupas() {
    const lista = document.getElementById('lista-roupas');
    lista.innerHTML = '';  // Limpa a lista antes de adicionar as roupas
    roupas.forEach((roupa, index) => {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.innerHTML = `${roupa.nome} - ${roupa.tipo} <button class="btn btn-danger btn-sm float-end ml-2" onclick="removerRoupa(${index})">Remover</button>`;
        lista.appendChild(li);
    });
}

// Função para remover roupa
function removerRoupa(index) {
    roupas.splice(index, 1);
    carregarRoupas();
}

// Função para gerar uma combinação aleatória de roupas
function gerarCombinacao() {
    if (roupas.length < 2) {
        document.getElementById('combinacao-gerada').textContent = 'Adicione mais roupas para gerar combinações!';
        return;
    }

    // Divisão dos tipos de roupas para permitir combinações apropriadas
    const tiposPermitidos = {
        "calça": ["camisa", "blusa", "suéter", "jaqueta", "casaco"], // Calças podem combinar com camisas, blusas, etc.
        "bermuda": ["camisa", "blusa", "regata", "polo"], // Bermudas com camisas, blusas, etc.
        "shorts": ["camisa", "blusa", "regata", "polo"], // Shorts com camisas, blusas, etc.
        "saia": ["blusa", "camisa", "top"], // Saias com blusas, camisas, tops
        "camisa": ["calça", "bermuda", "shorts", "saia", "jeans"], // Camisa pode ser combinada com todos os tipos
        // Você pode adicionar mais tipos e regras conforme necessário
    };

    // Lógica para gerar uma combinação válida
    let roupa1, roupa2;
    let tentativa = true;

    while (tentativa) {
        roupa1 = roupas[Math.floor(Math.random() * roupas.length)];
        roupa2 = roupas[Math.floor(Math.random() * roupas.length)];

        // Verificando se as roupas podem ser combinadas
        if (tiposPermitidos[roupa1.tipo].includes(roupa2.tipo) && roupa1 !== roupa2) {
            tentativa = false; // Sai do loop se a combinação for válida
        }
    }

    document.getElementById('combinacao-gerada').textContent = `Combinação sugerida: ${roupa1.nome} + ${roupa2.nome}`;
}

// Adicionar roupa
document.getElementById('form-roupa').addEventListener('submit', function(event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const tipo = document.getElementById('tipo').value;
    roupas.push({ nome, tipo });
    carregarRoupas();
    document.getElementById('nome').value = '';
    document.getElementById('tipo').value = '';
});

// Gerar combinação
document.getElementById('gerar-combinacao').addEventListener('click', gerarCombinacao);


