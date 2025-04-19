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

// ✅ Função corrigida para gerar uma combinação aleatória de roupas
function gerarCombinacao() {
    if (roupas.length <= 1) {
        document.getElementById('combinacao-gerada').textContent = 'Adicione mais roupas para gerar combinações!';
        return;
    }

    const tiposPermitidos = {
        "calça": ["camisa", "blusa", "suéter", "jaqueta", "casaco"],
        "bermuda": ["camisa", "blusa", "regata", "polo"],
        "shorts": ["camisa", "blusa", "regata", "polo"],
        "saia": ["blusa", "camisa", "top"],
        "camisa": ["calça", "bermuda", "shorts", "saia", "jeans"],
        "blusa": ["calça", "bermuda", "shorts", "saia"],
        "regata": ["bermuda", "shorts", "saia"],
        "polo": ["calça", "bermuda", "shorts"],
        "suéter": ["calça", "saia"],
        "jaqueta": ["calça"],
        "casaco": ["calça"],
        "top": ["saia", "shorts"]
    };

    const maxTentativas = 100;
    for (let tentativa = 0; tentativa < maxTentativas; tentativa++) {
        const roupa1 = roupas[Math.floor(Math.random() * roupas.length)];
        const roupa2 = roupas[Math.floor(Math.random() * roupas.length)];

        if (roupa1 !== roupa2) {
            const tipo1 = roupa1.tipo.toLowerCase();
            const tipo2 = roupa2.tipo.toLowerCase();

            if (tiposPermitidos[tipo1]?.includes(tipo2) || tiposPermitidos[tipo2]?.includes(tipo1)) {
                document.getElementById('combinacao-gerada').textContent =
                    `Combinação sugerida: ${roupa1.nome} + ${roupa2.nome}`;
                return;
            }
        }
    }

    document.getElementById('combinacao-gerada').textContent = 'Nenhuma combinação válida encontrada!';
}

// ✅ Adicionar roupa ao guarda-roupa
document.getElementById('form-roupa').addEventListener('submit', function(event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const tipo = document.getElementById('tipo').value;
    roupas.push({ nome, tipo: tipo.toLowerCase() }); // Adiciona ao array com tipo em minúsculo
    carregarRoupas();
    document.getElementById('nome').value = '';
    document.getElementById('tipo').value = '';
});

// Gerar combinação
document.getElementById('gerar-combinacao').addEventListener('click', gerarCombinacao);
