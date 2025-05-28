
// routes/escolarRoutes.js
const express = require('express');
const router = express.Router();
const { Escolar } = require('../models'); // Certifique-se de que 'Escolar' é o nome correto do seu modelo

// Listar todos os registros de Escolar
router.get('/', async (req, res) => {
  try {
    const escolares = await Escolar.findAll(); // Variável no plural para uma lista
    res.json(escolares);                     // Usando a variável no plural
  } catch (error) {
    console.error("ERRO em GET /escolar:", error);
    res.status(500).json({ error: 'Erro ao buscar registros de escolar' }); // Mensagem no plural/mais descritiva
  }
});

// Buscar registro de Escolar por id
router.get('/:id', async (req, res) => {
  try {
    const escolar = await Escolar.findByPk(req.params.id);
    if (!escolar) {
      return res.status(404).json({ error: 'Registro de escolar não encontrado' }); // Mensagem mais descritiva
    }
    res.json(escolar);
  } catch (error) {
    console.error("ERRO em GET /escolar/:id:", error);
    res.status(500).json({ error: 'Erro ao buscar registro de escolar' });
  }
});

// Criar novo registro de Escolar
router.post('/', async (req, res) => {
  try {
    const novoEscolar = await Escolar.create(req.body);
    res.status(201).json(novoEscolar);
  } catch (error) {
    console.error("ERRO em POST /escolar:", error);
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: 'Erro de validação ao criar registro de escolar', details: error.errors });
    }
    res.status(500).json({ error: 'Erro interno ao criar registro de escolar' });
  }
});

// Atualizar registro de Escolar
router.put('/:id', async (req, res) => {
  try {
    const escolar = await Escolar.findByPk(req.params.id); // Removido espaço extra antes de escolar
    if (!escolar) {
      return res.status(404).json({ error: 'Registro de escolar não encontrado para atualizar' }); // Mensagem mais descritiva
    }
    await escolar.update(req.body);
    res.json(escolar);
  } catch (error) {
    console.error("ERRO em PUT /escolar/:id:", error);
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: 'Erro de validação ao atualizar registro de escolar', details: error.errors });
    }
    res.status(500).json({ error: 'Erro interno ao atualizar registro de escolar' });
  }
});

// Excluir registro de Escolar
router.delete('/:id', async (req, res) => {
  try {
    const escolar = await Escolar.findByPk(req.params.id);
    if (!escolar) {
      // Corrigido o typo de 'escolarr' para 'escolar'
      return res.status(404).json({ error: 'Registro de escolar não encontrado para deletar' }); // Mensagem mais descritiva
    }
    await escolar.destroy();
    res.status(204).end();
  } catch (error) {
    console.error("ERRO em DELETE /escolar/:id:", error);
    // Para erros inesperados durante o delete, 500 é mais apropriado
    res.status(500).json({ error: 'Erro interno ao deletar registro de escolar' });
  }
});

module.exports = router;