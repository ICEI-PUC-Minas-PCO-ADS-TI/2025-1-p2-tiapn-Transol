const express = require('express');
const router = express.Router();
const { Administrador } = require('../models');

// Listar todos administradores
router.get('/', async (req, res) => {
  try {
    const administrador = await Administrador.findAll();
    res.json(administrador);
  } catch (error) {
    console.error("ERROR em GET / administrador:", error);
    res.status(500).json({ error: 'Erro ao buscar administrador' });
  }
});

// Buscar administrador por id
router.get('/:id', async (req, res) => {
  try {
    const administrador = await Administrador.findByPk(req.params.id);
    if (!administrador) return res.status(404).json({ error: 'Administrador não encontrado' });
    res.json(administrador);
  } catch (error) {
    console.error("ERROR em GET / administrador:id", error);
    res.status(500).json({ error: 'Erro ao buscar administrador' });
  }
});

// Criar novo administrador
router.post('/', async (req, res) => {
  try {
    const novoAdmin = await Administrador.create(req.body);
    res.status(201).json(novoAdmin);
  } catch (error) {
    console.error("ERROR em POST / administrador:id", error);
      if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: error.message, details: error.errors });
    }
    res.status(400).json({ error: 'Erro ao criar administrador' });
  }
});

// Atualizar administrador
router.put('/:id', async (req, res) => {
  try {
    const administrador = await Administrador.findByPk(req.params.id);
    if (!administrador) return res.status(404).json({ error: 'Administrador não encontrado' });
    await administrador.update(req.body);
    res.json(administrador);
  } catch (error) {
    console.error("ERROR em PUT / administrador:id :", error);
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: error.message, details: error.errors });
    }
    res.status(400).json({ error: 'Erro ao atualizar administrador' });
  }
});

// Excluir administrador
router.delete('/:id', async (req, res) => {
  try {
    const administrador = await Administrador.findByPk(req.params.id);
    if (!administrador) return res.status(404).json({ error: 'Administrador não encontrado' });
    await administrador.destroy();
    res.status(204).end();
  } catch (error) {
    console.error("ERROR em DELETE / administrador:id :", error);
    res.status(400).json({ error: 'Erro ao deletar administrador' });
  }
});

module.exports = router;
