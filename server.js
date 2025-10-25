const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para parser JSON
app.use(express.json());

// ========== CLASSES COM HERANÇA ==========

// Classe Base (Pai)
class Pessoa {
    constructor(id, nome, email) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.dataCriacao = new Date();
    }

    getInfo() {
        return `ID: ${this.id}, Nome: ${this.nome}, Email: ${this.email}`;
    }

    validar() {
        if (!this.nome || !this.email) {
            return false;
        }
        return true;
    }
}

// Classe Derivada (Filho) - Usuario
class Usuario extends Pessoa {
    constructor(id, nome, email, senha, tipo = 'comum') {
        super(id, nome, email); // Chama o construtor da classe pai
        this.senha = senha;
        this.tipo = tipo;
        this.ativo = true;
    }

    getInfo() {
        return `${super.getInfo()}, Tipo: ${this.tipo}, Ativo: ${this.ativo}`;
    }

    validar() {
        if (!super.validar() || !this.senha) {
            return false;
        }
        return true;
    }

    autenticar(senha) {
        return this.senha === senha;
    }
}

// Classe Derivada (Filho) - Administrador
class Administrador extends Usuario {
    constructor(id, nome, email, senha, nivel) {
        super(id, nome, email, senha, 'admin');
        this.nivel = nivel || 1;
        this.permissoes = ['criar', 'ler', 'atualizar', 'deletar'];
    }

    getInfo() {
        return `${super.getInfo()}, Nível: ${this.nivel}, Permissões: ${this.permissoes.length}`;
    }

    temPermissao(permissao) {
        return this.permissoes.includes(permissao);
    }
}

// ========== ARMAZENAMENTO EM VARIÁVEIS ==========

let usuarios = [
    new Usuario(1, 'João Silva', 'joao@email.com', '123456', 'comum'),
    new Usuario(2, 'Maria Santos', 'maria@email.com', 'senha123', 'comum'),
    new Administrador(3, 'Admin Master', 'admin@email.com', 'admin123', 3)
];

let proximoId = 4;

// ========== ROTAS DA API ==========

// Rota inicial
app.get('/', (req, res) => {
    res.json({
        mensagem: 'API CRUD com Herança - Funcionando!',
        endpoints: {
            'GET /usuarios': 'Listar todos os usuários',
            'GET /usuarios/:id': 'Buscar usuário por ID',
            'POST /usuarios': 'Criar novo usuário',
            'PUT /usuarios/:id': 'Atualizar usuário',
            'DELETE /usuarios/:id': 'Deletar usuário',
            'POST /usuarios/:id/autenticar': 'Autenticar usuário',
            'GET /usuarios/tipo/:tipo': 'Buscar usuários por tipo'
        }
    });
});

// CREATE - Criar novo usuário
app.post('/usuarios', (req, res) => {
    try {
        const { nome, email, senha, tipo, nivel } = req.body;

        let novoUsuario;
        
        if (tipo === 'admin') {
            novoUsuario = new Administrador(proximoId, nome, email, senha, nivel);
        } else {
            novoUsuario = new Usuario(proximoId, nome, email, senha, tipo);
        }

        if (!novoUsuario.validar()) {
            return res.status(400).json({ 
                erro: 'Dados inválidos. Nome, email e senha são obrigatórios.' 
            });
        }

        usuarios.push(novoUsuario);
        proximoId++;

        res.status(201).json({
            mensagem: 'Usuário criado com sucesso!',
            usuario: novoUsuario,
            info: novoUsuario.getInfo()
        });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

// READ - Listar todos os usuários
app.get('/usuarios', (req, res) => {
    const usuariosInfo = usuarios.map(u => ({
        ...u,
        info: u.getInfo()
    }));

    res.json({
        total: usuarios.length,
        usuarios: usuariosInfo
    });
});

// READ - Buscar usuário por ID
app.get('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const usuario = usuarios.find(u => u.id === id);

    if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    res.json({
        usuario: usuario,
        info: usuario.getInfo(),
        tipo: usuario.constructor.name // Mostra o nome da classe
    });
});

// READ - Buscar usuários por tipo
app.get('/usuarios/tipo/:tipo', (req, res) => {
    const tipo = req.params.tipo;
    const usuariosFiltrados = usuarios.filter(u => u.tipo === tipo);

    res.json({
        total: usuariosFiltrados.length,
        usuarios: usuariosFiltrados
    });
});

// UPDATE - Atualizar usuário
app.put('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = usuarios.findIndex(u => u.id === id);

    if (index === -1) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    const { nome, email, senha, ativo } = req.body;
    const usuarioAtual = usuarios[index];

    // Atualiza apenas os campos fornecidos
    if (nome) usuarioAtual.nome = nome;
    if (email) usuarioAtual.email = email;
    if (senha) usuarioAtual.senha = senha;
    if (ativo !== undefined) usuarioAtual.ativo = ativo;

    res.json({
        mensagem: 'Usuário atualizado com sucesso!',
        usuario: usuarioAtual,
        info: usuarioAtual.getInfo()
    });
});

// DELETE - Deletar usuário
app.delete('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = usuarios.findIndex(u => u.id === id);

    if (index === -1) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    const usuarioRemovido = usuarios.splice(index, 1)[0];

    res.json({
        mensagem: 'Usuário deletado com sucesso!',
        usuario: usuarioRemovido
    });
});

// ROTA EXTRA - Autenticar usuário (demonstra método da classe)
app.post('/usuarios/:id/autenticar', (req, res) => {
    const id = parseInt(req.params.id);
    const { senha } = req.body;
    const usuario = usuarios.find(u => u.id === id);

    if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    const autenticado = usuario.autenticar(senha);

    if (autenticado) {
        res.json({
            mensagem: 'Autenticação bem-sucedida!',
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                tipo: usuario.tipo
            }
        });
    } else {
        res.status(401).json({ erro: 'Senha incorreta' });
    }
});

// ROTA EXTRA - Verificar permissões (para admins)
app.get('/usuarios/:id/permissoes', (req, res) => {
    const id = parseInt(req.params.id);
    const usuario = usuarios.find(u => u.id === id);

    if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    if (!(usuario instanceof Administrador)) {
        return res.status(403).json({ 
            erro: 'Usuário não é um administrador',
            tipo: usuario.constructor.name
        });
    }

    res.json({
        usuario: usuario.nome,
        nivel: usuario.nivel,
        permissoes: usuario.permissoes
    });
});

// Tratamento de rotas não encontradas
app.use((req, res) => {
    res.status(404).json({ erro: 'Rota não encontrada' });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📡 Acesse: http://localhost:${PORT}`);
    console.log(`\n📚 Conceitos de Herança implementados:`);
    console.log(`   - Classe Base: Pessoa`);
    console.log(`   - Classe Derivada: Usuario (herda de Pessoa)`);
    console.log(`   - Classe Derivada: Administrador (herda de Usuario)`);
    console.log(`\n✨ ${usuarios.length} usuários iniciais carregados em memória`);
});


