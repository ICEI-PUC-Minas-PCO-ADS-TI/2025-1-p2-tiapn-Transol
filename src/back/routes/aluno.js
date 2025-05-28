
// routes/alunoRoutes.js
const express = require('express');
const router = express.Router();
const { Aluno } = require('../models'); // Certifique-se de que 'Aluno' é o nome correto do seu modelo importado

// Listar todos alunos
router.get('/', async (req, res) => {
  try {
    const alunos = await Aluno.findAll(); // Corrigido para 'alunos'
    res.json(alunos);                     // Corrigido para 'alunos'
  } catch (error) {
    console.error("ERRO em GET /aluno:", error);
    res.status(500).json({ error: 'Erro ao buscar alunos' }); // Mensagem no plural
  }
});

// Buscar aluno por id
router.get('/:id', async (req, res) => {
  try {
    const aluno = await Aluno.findByPk(req.params.id);
    if (!aluno) {
      return res.status(404).json({ error: 'Aluno não encontrado' });
    }
    res.json(aluno);
  } catch (error) {
    console.error("ERRO em GET /aluno/:id:", error);
    res.status(500).json({ error: 'Erro ao buscar aluno' });
  }
});

// Criar novo aluno
router.post('/', async (req, res) => {
  try {
    const novoAluno = await Aluno.create(req.body);
    res.status(201).json(novoAluno);
  } catch (error) {
    console.error("ERRO em POST /aluno:", error);
    if (error.name === 'SequelizeValidationError') {
      // Erro de validação do Sequelize (ex: campo obrigatório faltando)
      return res.status(400).json({ error: 'Erro de validação ao criar aluno', details: error.errors });
    }
    // Outros tipos de erro (ex: falha de conexão com o banco)
    res.status(500).json({ error: 'Erro interno ao criar aluno' });
  }
});

// Atualizar aluno
router.put('/:id', async (req, res) => {
  try {
    const aluno = await Aluno.findByPk(req.params.id);
    if (!aluno) {
      return res.status(404).json({ error: 'Aluno não encontrado para atualizar' });
    }
    await aluno.update(req.body);
    res.json(aluno);
  } catch (error) {
    console.error("ERRO em PUT /aluno/:id:", error);
    if (error.name === 'SequelizeValidationError') {
      // Erro de validação do Sequelize
      return res.status(400).json({ error: 'Erro de validação ao atualizar aluno', details: error.errors });
    }
    // Outros tipos de erro
    res.status(500).json({ error: 'Erro interno ao atualizar aluno' });
  }
});

// Excluir Aluno
router.delete('/:id', async (req, res) => {
  try {
    const aluno = await Aluno.findByPk(req.params.id);
    if (!aluno) {
      return res.status(404).json({ error: 'Aluno não encontrado para deletar' });
    }
    await aluno.destroy();
    res.status(204).end(); // 204 No Content (sucesso, sem corpo de resposta)
  } catch (error) {
    console.error("ERRO em DELETE /aluno/:id:", error);
    // Para erros inesperados durante o delete, 500 é mais apropriado que 400
    res.status(500).json({ error: 'Erro interno ao deletar aluno' });
  }
});

module.exports = router;