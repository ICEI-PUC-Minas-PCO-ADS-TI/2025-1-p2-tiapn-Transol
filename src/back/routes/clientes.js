// src/back/routes/clientes.js
const express = require('express');
const router = express.Router();
const db = require('../models');
const { verifyToken } = require('./auth');
const bcrypt = require('bcryptjs');


// Middleware para verificar se o usuário é um administrador (opcional, mas recomendado)
const verifyAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Acesso negado. Apenas administradores podem realizar esta ação.' });
  }
};


// Rota para cadastrar um novo cliente E SEUS ALUNOS
router.post('/', async (req, res) => {
  try {
    const { cliente, alunos } = req.body;

    // Validação básica
    if (!cliente || !cliente.nome || !cliente.cpf || !cliente.endereco || !cliente.telefone || !cliente.email || !cliente.senha) {
      return res.status(400).json({ error: 'Dados do cliente incompletos.' });
    }
    if (!alunos || !Array.isArray(alunos) || alunos.length === 0) {
      return res.status(400).json({ error: 'Nenhum aluno fornecido.' });
    }

    const novoCliente = await db.Clientes.create(cliente);

    const alunosCriados = [];
    for (const alunoData of alunos) {
      if (!alunoData.nome || !alunoData.escola || !alunoData.data_nasc || !alunoData.entrada || !alunoData.saida || !alunoData.id_escolar) {
        console.warn('Dados de um aluno incompletos, ignorando este aluno:', alunoData);
        continue;
      }
      const novoAluno = await db.Aluno.create({
        ...alunoData,
        id_clientes: novoCliente.id
      });
      alunosCriados.push(novoAluno);
    }

    res.status(201).json({
      message: 'Cliente e alunos cadastrados com sucesso!',
      cliente: novoCliente,
      alunos: alunosCriados
    });

  } catch (error) {
    console.error('Erro ao cadastrar cliente e alunos:', error.message);
    console.error('Stack:', error.stack);

    if (error.name === 'SequelizeUniqueConstraintError') {
      const field = error.errors[0].path;
      return res.status(409).json({ error: `O ${field} '${error.errors[0].value}' já está em uso.` });
    }
    res.status(500).json({ error: 'Erro interno do servidor ao cadastrar cliente e alunos.' });
  }
});

// Rota para buscar os dados do cliente logado e seus alunos (para o perfil do cliente)
router.get('/me', verifyToken, async (req, res) => {
  try {
    const clienteId = req.user.id;

    const cliente = await db.Clientes.findByPk(clienteId, {
      include: [
        {
          model: db.Aluno,
          as: 'alunos',
          include: [{ model: db.Escolar, as: 'escolar' }]
        },
        {
          model: db.Contrato,
          as: 'contrato'
        }
      ]
    });

    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado.' });
    }

    res.status(200).json(cliente);

  } catch (error) {
    console.error('Erro ao buscar dados do cliente logado:', error);
    res.status(500).json({ error: 'Erro interno do servidor ao buscar perfil do cliente.' });
  }
});

// Rota para listar os últimos 5 clientes cadastrados (para o painel do ADM)
router.get('/ultimos', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const ultimosClientes = await db.Clientes.findAll({
      limit: 5,
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'nome', 'cpf', 'email', 'telefone']
    });
    res.status(200).json(ultimosClientes);
  } catch (error) {
    console.error('Erro ao buscar últimos clientes:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

// Rota para buscar clientes por nome OU CPF (para o painel do ADM)
router.get('/', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { nome, cpf } = req.query;
    let options = {
      include: [{ model: db.Aluno, as: 'alunos' }],
      attributes: ['id', 'nome', 'cpf', 'email', 'telefone', 'endereco']
    };

    if (nome) {
      options.where = {
        nome: {
          [db.Sequelize.Op.like]: `%${nome}%`
        }
      };
    } else if (cpf) {
      options.where = {
        cpf: {
          [db.Sequelize.Op.like]: `%${cpf}%`
        }
      };
    }

    const clientes = await db.Clientes.findAll(options);
    res.status(200).json(clientes);
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

// Rota para buscar um cliente por ID (para o painel do ADM, para edição)
router.get('/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const cliente = await db.Clientes.findByPk(req.params.id, {
      include: [
        { model: db.Aluno, as: 'alunos', include: [{ model: db.Escolar, as: 'escolar' }] },
        { model: db.Contrato, as: 'contrato' }
      ]
    });
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado.' });
    }
    res.status(200).json(cliente);
  } catch (error) {
    console.error('Erro ao buscar cliente por ID:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});


// Rota para atualizar dados de um cliente (para o painel do ADM)
router.put('/:id', verifyToken, verifyAdmin, async (req, res) => {
  const { id } = req.params;
  const { cliente, alunos, alunosToDelete } = req.body;

  try {
    const clienteExistente = await db.Clientes.findByPk(id);
    if (!clienteExistente) {
      return res.status(404).json({ error: 'Cliente não encontrado para atualização.' });
    }

    if (cliente) {
      if (cliente.senha) {
        const salt = await bcrypt.genSalt(10);
        cliente.senha = await bcrypt.hash(cliente.senha, salt);
      }
      await clienteExistente.update(cliente);
    }

    if (alunosToDelete && Array.isArray(alunosToDelete) && alunosToDelete.length > 0) {
        await db.Aluno.destroy({
            where: {
                id: alunosToDelete,
                id_clientes: clienteExistente.id
            }
        });
    }

    if (alunos && Array.isArray(alunos)) {
      for (const alunoData of alunos) {
        if (alunoData.id) {
          const alunoExistente = await db.Aluno.findByPk(alunoData.id);
          if (alunoExistente && alunoExistente.id_clientes === clienteExistente.id) {
            await alunoExistente.update(alunoData);
          }
        } else {
          await db.Aluno.create({ ...alunoData, id_clientes: clienteExistente.id });
        }
      }
    }

    const clienteAtualizado = await db.Clientes.findByPk(id, {
      include: [
        { model: db.Aluno, as: 'alunos', include: [{ model: db.Escolar, as: 'escolar' }] },
        { model: db.Contrato, as: 'contrato' }
      ]
    });

    res.status(200).json({
      message: 'Cliente e alunos atualizados com sucesso!',
      cliente: clienteAtualizado
    });

  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      const field = error.errors[0].path;
      return res.status(409).json({ error: `O ${field} '${error.errors[0].value}' já está em uso.` });
    }
    res.status(500).json({ error: 'Erro interno do servidor ao atualizar cliente.' });
  }
});

// Rota para deletar um cliente (para o painel do ADM)
router.delete('/:id', verifyToken, verifyAdmin, async (req, res) => {
  console.log('DEBUG (clientes.js - DELETE /:id): Rota DELETE acionada para ID:', req.params.id);
  try {
    const { id } = req.params;
    const cliente = await db.Clientes.findByPk(id);

    if (!cliente) {
      console.log('DEBUG (clientes.js - DELETE /:id): Cliente não encontrado para ID:', id);
      return res.status(404).json({ error: 'Cliente não encontrado para exclusão.' });
    }

    console.log('DEBUG (clientes.js - DELETE /:id): Tentando deletar cliente com ID:', id);
    await cliente.destroy();
    console.log('DEBUG (clientes.js - DELETE /:id): Cliente deletado com sucesso. ID:', id);

    res.status(204).send();

  } catch (error) {
    console.error('DEBUG (clientes.js - DELETE /:id): Erro ao deletar cliente:', error);
    console.error('Stack:', error.stack);
    res.status(500).json({ error: 'Erro interno do servidor ao deletar cliente.' });
  }
});


module.exports = router;
