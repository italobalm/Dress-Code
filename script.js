// Função para adicionar um evento de clique de forma segura
function adicionarEventoClique(id, destino) {
    const botao = document.getElementById(id);
    if (botao) {
        botao.addEventListener("click", () => window.location.href = destino);
    }
}

// Adicionando eventos de redirecionamento
adicionarEventoClique("botaoEntrar", "cadastrarRoupas.html");
adicionarEventoClique("botaoCadastro", "novoUsuario.html");
adicionarEventoClique("finalizarCadastro", "cadastrarRoupas.html");


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
    let maxTentativas = 2;

    while (tentativa < maxTentativas) {
        roupa1 = roupas[Math.floor(Math.random() * roupas.length)];
        roupa2 = roupas[Math.floor(Math.random() * roupas.length)];

        if (roupa1 !== roupa2 && tiposPermitidos[roupa1.tipo]?.includes(roupa2.tipo)) {
            document.getElementById('combinacao-gerada').textContent = `Combinação sugerida: ${roupa1.nome} + ${roupa2.nome}`;
            return;
        }
        tentativa++;
    }

    // Se não encontrou nenhuma combinação válida
    document.getElementById('combinacao-gerada').textContent = 'Nenhuma combinação válida encontrada!';
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


