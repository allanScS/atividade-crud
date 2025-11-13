-- Script SQL para inicialização do banco de dados
-- Execute este script caso a tabela não seja criada automaticamente

-- Criar tabela de usuários
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  age INTEGER CHECK (age >= 0 AND age <= 150),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar índice para email (melhora performance nas buscas)
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Inserir dados de exemplo (opcional)
INSERT INTO users (name, email, age) VALUES
  ('João Silva', 'joao@example.com', 30),
  ('Maria Santos', 'maria@example.com', 25),
  ('Pedro Oliveira', 'pedro@example.com', 35)
ON CONFLICT (email) DO NOTHING;

-- Visualizar dados
SELECT * FROM users;

