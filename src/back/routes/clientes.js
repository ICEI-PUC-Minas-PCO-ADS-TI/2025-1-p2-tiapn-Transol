
// routes/clientesRoutes.js
const express = require('express');
const router = express.Router();
const { Cliente } = require('../models'); // Certifique-se de que 'Cliente' é o nome correto do seu modelo

//Listar todos os clientes
router.get('/', async(req, res) => {
    try {
        const clientes = await Cliente.findAll();
        res.json(clientes);
    } catch (err) {
        console.error("ERRO em GET /clientes:", err);
        res.status(500).json({ error: 'Erro ao buscar clientes'});
    }
});

//Buscar cliente por id
router.get('/:id', async (req, res) => {
    try {
        const cliente = await Cliente.findByPk(req.params.id);
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente não encontrado'});
        }
        res.json(cliente);
    } catch (err) {
        console.error("ERRO em GET /clientes/:id:", err);
        res.status(500).json({ error: 'Erro ao buscar cliente' });
    }
});

//Criar novo cliente
router.post('/', async (req, res) => {
    try {
        const novoCliente = await Cliente.create(req.body); // Renomeado 'novo' para 'novoCliente' para clareza
        res.status(201).json(novoCliente);
    } catch (err) {
        console.error("ERRO em POST /clientes:", err);
        if (err.name === 'SequelizeValidationError') {
            return res.status(400).json({ error: 'Erro de validação ao criar cliente', details: err.errors });
        }
        res.status(500).json({ error: 'Erro interno ao criar cliente' });
    }
});

//Atualizar cliente
router.put('/:id', async (req, res) => {
    try {
        const cliente = await Cliente.findByPk(req.params.id);
        if(!cliente) {
            return res.status(404).json({ error: 'Cliente não encontrado para atualizar' });
        }
        await cliente.update(req.body);
        res.json(cliente);
    } catch (err) {
        console.error("ERRO em PUT /clientes/:id:", err);
        if (err.name === 'SequelizeValidationError') {
            return res.status(400).json({ error: 'Erro de validação ao atualizar cliente', details: err.errors });
        }
        res.status(500).json({ error: 'Erro interno ao atualizar cliente' });
    }
});

//Excluir cliente
router.delete('/:id', async (req, res) => {
    try {
        const cliente = await Cliente.findByPk(req.params.id);
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente não encontrado para deletar'});
        }
        await cliente.destroy();
        res.status(204).end();
    } catch (err) {
        console.error("ERRO em DELETE /clientes/:id:", err);
        // Para erros inesperados durante o delete, 500 é mais apropriado
        res.status(500).json({ error: 'Erro interno ao deletar cliente' });
    }
});

module.exports = router;