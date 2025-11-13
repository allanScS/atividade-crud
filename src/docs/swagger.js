const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Configuração do Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Usuários - CRUD Completo',
      version: '1.0.0',
      description: 'API REST completa para gerenciamento de usuários com Node.js, Express e PostgreSQL',
      contact: {
        name: 'Suporte API',
        email: 'suporte@example.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de Desenvolvimento',
      },
      {
        url: 'https://seu-app.onrender.com',
        description: 'Servidor de Produção (Render)',
      },
    ],
    tags: [
      {
        name: 'Users',
        description: 'Operações relacionadas a usuários',
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Caminho para os arquivos com anotações Swagger
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

/**
 * Função para configurar o Swagger na aplicação Express
 */
const setupSwagger = (app) => {
  // Documentação em JSON
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  // Interface Swagger UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'API Docs - CRUD Usuários',
  }));

  console.log('Documentação Swagger disponível em: /api-docs');
};

module.exports = setupSwagger;

