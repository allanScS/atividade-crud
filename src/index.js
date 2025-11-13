const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { initDB } = require('./db');
const userRoutes = require('./routes/userRoutes');
const setupSwagger = require('./docs/swagger');

const app = express();
const PORT = process.env.PORT || 3000;

// ========== MIDDLEWARES ==========
app.use(cors()); // Habilita CORS
app.use(express.json()); // Parser JSON
app.use(express.urlencoded({ extended: true })); // Parser URL-encoded

// Log de requisições (middleware customizado)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// ========== ROTAS ==========

// Rota raiz
app.get('/', (req, res) => {
  res.json({
    message: 'API de Usuários - CRUD Completo',
    version: '1.0.0',
    documentation: '/api-docs',
    endpoints: {
      users: {
        'GET /users': 'Listar todos os usuários',
        'GET /users/:id': 'Buscar usuário por ID',
        'POST /users': 'Criar novo usuário',
        'PUT /users/:id': 'Atualizar usuário',
        'DELETE /users/:id': 'Deletar usuário',
      },
    },
    database: 'PostgreSQL',
    status: 'online',
  });
});

// Rotas de usuários
app.use('/users', userRoutes);

// Configurar Swagger
setupSwagger(app);

// ========== TRATAMENTO DE ERROS ==========

// Rota não encontrada
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Rota não encontrada',
    path: req.url,
  });
});

// Middleware de erro global
app.use((err, req, res, next) => {
  console.error('ERRO:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Erro interno do servidor',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
});

// ========== INICIALIZAÇÃO DO SERVIDOR ==========

const startServer = async () => {
  try {
    // Inicializar banco de dados
    console.log('Conectando ao PostgreSQL...');
    await initDB();
    
    // Iniciar servidor
    app.listen(PORT, () => {
      console.error('Servidor iniciado com sucesso');
    });
  } catch (error) {
    console.error('ERRO ao iniciar servidor:', error.message);
    process.exit(1);
  }
};

// Iniciar servidor
startServer();

module.exports = app;

