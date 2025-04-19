const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const sugestoesRouter = require('./rotas/sugestoes');
app.use('/api/sugestoes', sugestoesRouter);


const USERS_FILE = './usuarios.json';

// Função para ler os usuários existentes
function lerUsuarios() {
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, '[]');
  }
  const data = fs.readFileSync(USERS_FILE);
  return JSON.parse(data);
}

// Função para salvar a lista de usuários
function salvarUsuarios(usuarios) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(usuarios, null, 2));
}

// Rota de cadastro
app.post('/cadastro', (req, res) => {
  const { nome, sobrenome, email, nascimento, senha } = req.body;

  if (!nome || !sobrenome || !email || !nascimento || !senha) {
    return res.status(400).json({ success: false, mensagem: 'Todos os campos são obrigatórios.' });
  }

  const usuarios = lerUsuarios();

  const usuarioExistente = usuarios.find((u) => u.email === email);
  if (usuarioExistente) {
    return res.status(409).json({ success: false, mensagem: 'E-mail já cadastrado.' });
  }

  const novoUsuario = { nome, sobrenome, email, nascimento, senha };
  usuarios.push(novoUsuario);
  salvarUsuarios(usuarios);

  res.status(201).json({ success: true, mensagem: 'Usuário cadastrado com sucesso.' });
});

// Rota de login (só pra facilitar seu teste)
app.post('/login', (req, res) => {
  const { email, senha } = req.body;
  const usuarios = lerUsuarios();

  const usuario = usuarios.find(u => u.email === email && u.senha === senha);
  if (!usuario) {
    return res.status(401).json({ success: false, mensagem: 'Credenciais inválidas.' });
  }

  res.json({ success: true, nome: usuario.nome });
});

app.listen(PORT, () => {
  console.log(`🔥 Servidor rodando em http://localhost:${PORT}`);
});
