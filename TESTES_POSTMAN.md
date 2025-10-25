# 🧪 Guia de Testes da API no Postman

## 📋 Configuração Inicial

1. **Instalar dependências:**
```bash
npm install
```

2. **Iniciar o servidor:**
```bash
npm start
```

3. **URL Base da API:**
```
http://localhost:3000
```

---

## 🔍 Testes no Postman

### 1. GET - Rota Inicial (Ver todas as rotas disponíveis)

**Método:** `GET`  
**URL:** `http://localhost:3000/`  
**Body:** Nenhum

**Resposta esperada:** Lista de todos os endpoints disponíveis

---

### 2. GET - Listar Todos os Usuários

**Método:** `GET`  
**URL:** `http://localhost:3000/usuarios`  
**Body:** Nenhum

**Resposta esperada:**
```json
{
  "total": 3,
  "usuarios": [...]
}
```

---

### 3. GET - Buscar Usuário por ID

**Método:** `GET`  
**URL:** `http://localhost:3000/usuarios/1`  
**Body:** Nenhum

**Resposta esperada:**
```json
{
  "usuario": {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@email.com",
    ...
  },
  "info": "ID: 1, Nome: João Silva, Email: joao@email.com, Tipo: comum, Ativo: true",
  "tipo": "Usuario"
}
```

---

### 4. POST - Criar Novo Usuário Comum

**Método:** `POST`  
**URL:** `http://localhost:3000/usuarios`  
**Headers:**
- `Content-Type: application/json`

**Body (raw - JSON):**
```json
{
  "nome": "Carlos Oliveira",
  "email": "carlos@email.com",
  "senha": "senha456",
  "tipo": "comum"
}
```

**Resposta esperada:**
```json
{
  "mensagem": "Usuário criado com sucesso!",
  "usuario": {...},
  "info": "..."
}
```

---

### 5. POST - Criar Novo Administrador

**Método:** `POST`  
**URL:** `http://localhost:3000/usuarios`  
**Headers:**
- `Content-Type: application/json`

**Body (raw - JSON):**
```json
{
  "nome": "Admin Teste",
  "email": "admintest@email.com",
  "senha": "admin456",
  "tipo": "admin",
  "nivel": 2
}
```

**Resposta esperada:**
```json
{
  "mensagem": "Usuário criado com sucesso!",
  "usuario": {
    "id": 4,
    "tipo": "admin",
    "nivel": 2,
    "permissoes": ["criar", "ler", "atualizar", "deletar"],
    ...
  }
}
```

---

### 6. PUT - Atualizar Usuário

**Método:** `PUT`  
**URL:** `http://localhost:3000/usuarios/1`  
**Headers:**
- `Content-Type: application/json`

**Body (raw - JSON):**
```json
{
  "nome": "João Silva Atualizado",
  "email": "joao.novo@email.com"
}
```

**Resposta esperada:**
```json
{
  "mensagem": "Usuário atualizado com sucesso!",
  "usuario": {...}
}
```

---

### 7. DELETE - Deletar Usuário

**Método:** `DELETE`  
**URL:** `http://localhost:3000/usuarios/2`  
**Body:** Nenhum

**Resposta esperada:**
```json
{
  "mensagem": "Usuário deletado com sucesso!",
  "usuario": {...}
}
```

---

### 8. GET - Buscar Usuários por Tipo

**Método:** `GET`  
**URL:** `http://localhost:3000/usuarios/tipo/comum`  
**Body:** Nenhum

**Resposta esperada:**
```json
{
  "total": 2,
  "usuarios": [...]
}
```

**Outros tipos para testar:**
- `http://localhost:3000/usuarios/tipo/admin`

---

### 9. POST - Autenticar Usuário

**Método:** `POST`  
**URL:** `http://localhost:3000/usuarios/1/autenticar`  
**Headers:**
- `Content-Type: application/json`

**Body (raw - JSON):**
```json
{
  "senha": "123456"
}
```

**Resposta esperada (sucesso):**
```json
{
  "mensagem": "Autenticação bem-sucedida!",
  "usuario": {...}
}
```

**Resposta esperada (senha errada):**
```json
{
  "erro": "Senha incorreta"
}
```

---

### 10. GET - Verificar Permissões de Admin

**Método:** `GET`  
**URL:** `http://localhost:3000/usuarios/3/permissoes`  
**Body:** Nenhum

**Resposta esperada (Admin):**
```json
{
  "usuario": "Admin Master",
  "nivel": 3,
  "permissoes": ["criar", "ler", "atualizar", "deletar"]
}
```

**Resposta esperada (Usuário comum):**
```json
{
  "erro": "Usuário não é um administrador",
  "tipo": "Usuario"
}
```

---

## 🎯 Casos de Teste Extras

### Teste de Erro - Usuário não encontrado

**Método:** `GET`  
**URL:** `http://localhost:3000/usuarios/999`

**Resposta esperada:**
```json
{
  "erro": "Usuário não encontrado"
}
```

---

### Teste de Erro - Dados inválidos na criação

**Método:** `POST`  
**URL:** `http://localhost:3000/usuarios`  
**Body:**
```json
{
  "nome": "Teste",
  "email": ""
}
```

**Resposta esperada:**
```json
{
  "erro": "Dados inválidos. Nome, email e senha são obrigatórios."
}
```

---

## 📊 Conceitos de Herança Demonstrados

A API demonstra herança em POO através de 3 classes:

1. **Pessoa (Classe Base)**
   - Propriedades: id, nome, email, dataCriacao
   - Métodos: getInfo(), validar()

2. **Usuario (Herda de Pessoa)**
   - Propriedades adicionais: senha, tipo, ativo
   - Métodos: sobrescreve getInfo() e validar(), adiciona autenticar()

3. **Administrador (Herda de Usuario)**
   - Propriedades adicionais: nivel, permissoes
   - Métodos: sobrescreve getInfo(), adiciona temPermissao()

---

## 💡 Dicas para Testar

1. **Ordem recomendada de testes:**
   - Primeiro teste GET (listar todos)
   - Depois teste POST (criar novos)
   - Depois teste PUT (atualizar)
   - Por último teste DELETE

2. **Use variáveis no Postman:**
   - Crie uma variável `base_url` com valor `http://localhost:3000`
   - Use `{{base_url}}/usuarios` nas requisições

3. **Salve as requisições:**
   - Crie uma Collection no Postman
   - Adicione todas as requisições na collection
   - Você pode exportar e compartilhar depois

4. **Observe os IDs:**
   - IDs iniciais: 1, 2, 3
   - Novos usuários terão IDs sequenciais (4, 5, 6...)

---

## ✅ Checklist de Testes

- [ ] GET / (rota inicial)
- [ ] GET /usuarios (listar todos)
- [ ] GET /usuarios/:id (buscar por ID)
- [ ] POST /usuarios (criar usuário comum)
- [ ] POST /usuarios (criar administrador)
- [ ] PUT /usuarios/:id (atualizar)
- [ ] DELETE /usuarios/:id (deletar)
- [ ] GET /usuarios/tipo/:tipo (filtrar por tipo)
- [ ] POST /usuarios/:id/autenticar (autenticar)
- [ ] GET /usuarios/:id/permissoes (verificar permissões)
- [ ] Testar erros (ID inexistente, dados inválidos)

---

## 🚀 Problemas Comuns

**Erro: "Cannot GET /"**
- Verifique se o servidor está rodando
- Verifique se a porta 3000 está livre

**Erro: "Cannot find module 'express'"**
- Execute `npm install` para instalar as dependências

**Erro 404 em rotas**
- Verifique a URL digitada
- Verifique se está usando o método HTTP correto (GET, POST, PUT, DELETE)

**Erro ao enviar JSON**
- Verifique se o Header `Content-Type: application/json` está configurado
- Verifique se o JSON está válido (sem vírgulas extras, aspas corretas)


