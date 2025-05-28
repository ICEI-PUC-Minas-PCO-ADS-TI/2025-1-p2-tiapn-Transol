// routes/contratoRoutes.js
const express = require('express');
const router = express.Router();
const { Contrato } = require('../models'); // Certifique-se de que 'Contrato' é o nome correto do seu modelo

//Listar todos os Contratos
router.get('/', async(req, res) => {
    try {
        const contratos = await Contrato.findAll(); // Variável no plural para uma lista
        res.json(contratos);                      // Usando a variável no plural
    } catch (err) {
        console.error("ERRO em GET /contrato:", err);
        res.status(500).json({ error: 'Erro ao buscar contratos'}); // Mensagem no plural
    }
});

//Buscar contrato por id
router.get('/:id', async (req, res) => {
    try {
        const contrato = await Contrato.findByPk(req.params.id);
        if (!contrato) {
            return res.status(404).json({ error: 'Contrato não encontrado'}); // Ajustado para 'Contrato'
        }
        res.json(contrato);
    } catch (err) {
        console.error("ERRO em GET /contrato/:id:", err);
        res.status(500).json({ error: 'Erro ao buscar contrato' });
    }
});

//Criar novo contrato
router.post('/', async (req, res) => {
    try {
        const novoContrato = await Contrato.create(req.body);
        res.status(201).json(novoContrato);
    } catch (err) {
        console.error("ERRO em POST /contrato:", err);
        if (err.name === 'SequelizeValidationError') {
            return res.status(400).json({ error: 'Erro de validação ao criar contrato', details: err.errors });
        }
        res.status(500).json({ error: 'Erro interno ao criar contrato' });
    }
});

//Atualizar contrato
router.put('/:id', async (req, res) => {
    try {
        const contrato = await Contrato.findByPk(req.params.id);
        if(!contrato) {
            return res.status(404).json({ error: 'Contrato não encontrado para atualizar' }); // Ajustado para 'Contrato'
        }
        await contrato.update(req.body);
        res.json(contrato);
    } catch (err) {
        console.error("ERRO em PUT /contrato/:id:", err);
        if (err.name === 'SequelizeValidationError') {
            return res.status(400).json({ error: 'Erro de validação ao atualizar contrato', details: err.errors });
        }
        res.status(500).json({ error: 'Erro interno ao atualizar contrato' });
    }
});

//Excluir contrato (o comentário original dizia "Excluir cliente", corrigido)
router.delete('/:id', async (req, res) => {
    try {
        const contrato = await Contrato.findByPk(req.params.id);
        if (!contrato) {
            return res.status(404).json({ error: 'Contrato não encontrado para deletar'}); // Ajustado para 'Contrato'
        }
        await contrato.destroy();
        res.status(204).end();
    } catch (err) {
        console.error("ERRO em DELETE /contrato/:id:", err);
        // Para erros inesperados durante o delete, 500 é mais apropriado
        res.status(500).json({ error: 'Erro interno ao deletar contrato' });
    }
});

module.exports = router;