const UserModel = require('../models/userModel');

/**
 * Controller para gerenciar operações de usuários
 */
const UserController = {
  /**
   * GET /users - Listar todos os usuários
   */
  async getAll(req, res) {
    try {
      const users = await UserModel.findAll();
      res.status(200).json({
        success: true,
        count: users.length,
        data: users,
      });
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar usuários',
        error: error.message,
      });
    }
  },

  /**
   * GET /users/:id - Buscar usuário por ID
   */
  async getById(req, res) {
    try {
      const { id } = req.params;
      const user = await UserModel.findById(id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: `Usuário com ID ${id} não encontrado`,
        });
      }

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar usuário',
        error: error.message,
      });
    }
  },

  /**
   * POST /users - Criar novo usuário
   */
  async create(req, res) {
    try {
      const { name, email, age } = req.body;

      // Validações básicas
      if (!name || !email) {
        return res.status(400).json({
          success: false,
          message: 'Nome e email são obrigatórios',
        });
      }

      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: 'Email inválido',
        });
      }

      // Verificar se email já existe
      const existingUser = await UserModel.findByEmail(email);
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: 'Email já cadastrado',
        });
      }

      // Validar idade se fornecida
      if (age !== undefined && (age < 0 || age > 150)) {
        return res.status(400).json({
          success: false,
          message: 'Idade deve estar entre 0 e 150',
        });
      }

      const newUser = await UserModel.create({ name, email, age });

      res.status(201).json({
        success: true,
        message: 'Usuário criado com sucesso',
        data: newUser,
      });
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao criar usuário',
        error: error.message,
      });
    }
  },

  /**
   * PUT /users/:id - Atualizar usuário existente
   */
  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, email, age } = req.body;

      // Verificar se usuário existe
      const existingUser = await UserModel.findById(id);
      if (!existingUser) {
        return res.status(404).json({
          success: false,
          message: `Usuário com ID ${id} não encontrado`,
        });
      }

      // Validações básicas
      if (!name || !email) {
        return res.status(400).json({
          success: false,
          message: 'Nome e email são obrigatórios',
        });
      }

      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: 'Email inválido',
        });
      }

      // Verificar se email já existe em outro usuário
      const userWithEmail = await UserModel.findByEmail(email);
      if (userWithEmail && userWithEmail.id !== parseInt(id)) {
        return res.status(409).json({
          success: false,
          message: 'Email já cadastrado para outro usuário',
        });
      }

      // Validar idade se fornecida
      if (age !== undefined && (age < 0 || age > 150)) {
        return res.status(400).json({
          success: false,
          message: 'Idade deve estar entre 0 e 150',
        });
      }

      const updatedUser = await UserModel.update(id, { name, email, age });

      res.status(200).json({
        success: true,
        message: 'Usuário atualizado com sucesso',
        data: updatedUser,
      });
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao atualizar usuário',
        error: error.message,
      });
    }
  },

  /**
   * DELETE /users/:id - Deletar usuário
   */
  async delete(req, res) {
    try {
      const { id } = req.params;

      // Verificar se usuário existe
      const existingUser = await UserModel.findById(id);
      if (!existingUser) {
        return res.status(404).json({
          success: false,
          message: `Usuário com ID ${id} não encontrado`,
        });
      }

      const deletedUser = await UserModel.delete(id);

      res.status(200).json({
        success: true,
        message: 'Usuário deletado com sucesso',
        data: deletedUser,
      });
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao deletar usuário',
        error: error.message,
      });
    }
  },
};

module.exports = UserController;

