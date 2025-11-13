# API de Usuários - CRUD Completo

API REST completa desenvolvida com Node.js, Express e PostgreSQL, incluindo documentação automática com Swagger.

## 🚀 Tecnologias Utilizadas

- **Node.js** - Ambiente de execução JavaScript
- **Express.js** - Framework web para Node.js
- **PostgreSQL** - Banco de dados relacional
- **Swagger** - Documentação interativa da API
- **CORS** - Controle de acesso entre origens
- **Dotenv** - Gerenciamento de variáveis de ambiente

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/) (geralmente vem com Node.js)
- Acesso ao PostgreSQL (credenciais fornecidas no `.env`)

## 🔧 Instalação

1. **Clone ou baixe o projeto**

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   
   O arquivo `.env.example` já está configurado. Copie-o para `.env`:
   ```bash
   copy .env.example .env
   ```
   
   Ou crie manualmente um arquivo `.env` na raiz do projeto com:
   ```env
   PORT=3000
   DB_HOST=neoapp.c7ehgmwtdmov.us-east-1.rds.amazonaws.com
   DB_PORT=5432
   DB_NAME=postgres
   DB_USER=postgres
   DB_PASSWORD=hOCuylmrlMK5bGlzqeCE
   ```

## 🎯 Executando o Projeto

### Modo Desenvolvimento (com auto-reload):
```bash
npm run dev
```

### Modo Produção:
```bash
npm start
```

O servidor estará disponível em: `http://localhost:3000`

## 📚 Documentação da API

Acesse a documentação interativa Swagger em:
```
http://localhost:3000/api-docs
```

## 📡 Endpoints Disponíveis

### Usuários

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/users` | Lista todos os usuários |
| GET | `/users/:id` | Busca usuário por ID |
| POST | `/users` | Cria um novo usuário |
| PUT | `/users/:id` | Atualiza usuário existente |
| DELETE | `/users/:id` | Remove um usuário |

## 📝 Exemplos de Uso

### Listar todos os usuários
```bash
GET http://localhost:3000/users
```

### Buscar usuário por ID
```bash
GET http://localhost:3000/users/1
```

### Criar novo usuário
```bash
POST http://localhost:3000/users
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@example.com",
  "age": 30
}
```

### Atualizar usuário
```bash
PUT http://localhost:3000/users/1
Content-Type: application/json

{
  "name": "João Silva Santos",
  "email": "joao.santos@example.com",
  "age": 31
}
```

### Deletar usuário
```bash
DELETE http://localhost:3000/users/1
```

## 🗂️ Estrutura do Projeto

```
atividade-crud/
├── src/
│   ├── controllers/
│   │   └── userController.js    # Lógica de negócio
│   ├── models/
│   │   └── userModel.js         # Operações de banco de dados
│   ├── routes/
│   │   └── userRoutes.js        # Definição de rotas
│   ├── docs/
│   │   └── swagger.js           # Configuração Swagger
│   ├── db.js                    # Conexão PostgreSQL
│   └── index.js                 # Entry point da aplicação
├── .env                         # Variáveis de ambiente (não versionar)
├── .env.example                 # Exemplo de variáveis de ambiente
├── .gitignore                   # Arquivos ignorados pelo Git
├── package.json                 # Dependências e scripts
└── README.md                    # Este arquivo
```

## 🗄️ Estrutura do Banco de Dados

### Tabela: `users`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | SERIAL | Chave primária (auto-incremento) |
| name | VARCHAR(255) | Nome do usuário |
| email | VARCHAR(255) | Email (único) |
| age | INTEGER | Idade do usuário |
| created_at | TIMESTAMP | Data de criação |
| updated_at | TIMESTAMP | Data de atualização |

## 🚀 Deploy no Render

### Passo 1: Preparar o repositório
1. Certifique-se de que todos os arquivos estão commitados
2. Faça push para GitHub, GitLab ou Bitbucket

### Passo 2: Criar novo Web Service no Render
1. Acesse [Render Dashboard](https://dashboard.render.com/)
2. Clique em "New +" → "Web Service"
3. Conecte seu repositório

### Passo 3: Configurar o Web Service
- **Name**: api-crud-usuarios (ou seu nome preferido)
- **Environment**: Node
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### Passo 4: Configurar Variáveis de Ambiente
Adicione as seguintes variáveis de ambiente no Render:
```
PORT=3000
DB_HOST=neoapp.c7ehgmwtdmov.us-east-1.rds.amazonaws.com
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=hOCuylmrlMK5bGlzqeCE
```

### Passo 5: Deploy
Clique em "Create Web Service" e aguarde o deploy.

Após o deploy, sua API estará disponível em:
```
https://seu-app.onrender.com
```

Documentação Swagger:
```
https://seu-app.onrender.com/api-docs
```

## 🔐 Segurança

⚠️ **IMPORTANTE**: 
- Nunca commite o arquivo `.env` com credenciais reais
- Use variáveis de ambiente para informações sensíveis
- Em produção, use credenciais diferentes das de desenvolvimento

## 🛠️ Scripts NPM

| Script | Descrição |
|--------|-----------|
| `npm start` | Inicia o servidor em modo produção |
| `npm run dev` | Inicia o servidor em modo desenvolvimento com nodemon |

## ✅ Funcionalidades

- ✅ CRUD completo de usuários
- ✅ Conexão com PostgreSQL
- ✅ Validação de dados
- ✅ Tratamento de erros
- ✅ Documentação Swagger automática
- ✅ CORS habilitado
- ✅ Respostas JSON padronizadas
- ✅ Logs de requisições
- ✅ Pronto para deploy no Render

## 📧 Contato

Para dúvidas ou sugestões, entre em contato através do email: suporte@example.com

## 📄 Licença

Este projeto está sob a licença ISC.

