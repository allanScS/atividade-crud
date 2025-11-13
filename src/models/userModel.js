const { pool } = require('../db');

/**
 * Model para operações de usuários no banco de dados
 */
const UserModel = {
  /**
   * Buscar todos os usuários
   */
  async findAll() {
    const query = 'SELECT * FROM users ORDER BY id ASC';
    const result = await pool.query(query);
    return result.rows;
  },

  /**
   * Buscar usuário por ID
   */
  async findById(id) {
    const query = 'SELECT * FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  /**
   * Buscar usuário por email
   */
  async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
  },

  /**
   * Criar novo usuário
   */
  async create(userData) {
    const { name, email, age } = userData;
    const query = `
      INSERT INTO users (name, email, age, created_at, updated_at)
      VALUES ($1, $2, $3, NOW(), NOW())
      RETURNING *
    `;
    const result = await pool.query(query, [name, email, age]);
    return result.rows[0];
  },

  /**
   * Atualizar usuário existente
   */
  async update(id, userData) {
    const { name, email, age } = userData;
    const query = `
      UPDATE users
      SET name = $1, email = $2, age = $3, updated_at = NOW()
      WHERE id = $4
      RETURNING *
    `;
    const result = await pool.query(query, [name, email, age, id]);
    return result.rows[0];
  },

  /**
   * Deletar usuário
   */
  async delete(id) {
    const query = 'DELETE FROM users WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },
};

module.exports = UserModel;

