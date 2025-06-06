// src/back/routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Clientes, Administrador } = require('../models');
const { Op } = require('sequelize');

// Chave Secreta para JWT (MUITO IMPORTANTE: Mude para uma string complexa em produção!)
const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_secreta_muito_forte_e_aleatoria';

// Rota de Login para Clientes (CPF)
router.post('/login', async (req, res) => {
  const { cpf, senha } = req.body;

  try {
    const cliente = await Clientes.findOne({ where: { cpf } });

    if (!cliente) {
      return res.status(401).json({ error: 'CPF ou senha inválidos.' });
    }

    const senhaValida = await bcrypt.compare(senha, cliente.senha);

    if (!senhaValida) {
      return res.status(401).json({ error: 'CPF ou senha inválidos.' });
    }

    const token = jwt.sign(
      { id: cliente.id, cpf: cliente.cpf, email: cliente.email, role: 'cliente' },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    const isFirstLogin = await bcrypt.compare('transol1234', cliente.senha);

    res.status(200).json({
      message: 'Login bem-sucedido!',
      token,
      cliente: {
        id: cliente.id,
        nome: cliente.nome,
        cpf: cliente.cpf,
        email: cliente.email
      },
      requiresPasswordChange: isFirstLogin
    });

  } catch (error) {
    console.error('Erro no login de cliente:', error);
    res.status(500).json({ error: 'Erro interno do servidor ao fazer login de cliente.' });
  }
});

// Middleware para verificar o JWT
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).json({ error: 'Token não fornecido.' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido ou expirado.' });
    }
    req.user = user;
    next();
  });
};

// Rota para Troca de Senha (clientes)
router.post('/trocar-senha', verifyToken, async (req, res) => {
  const { senhaAntiga, novaSenha, confirmacaoNovaSenha } = req.body;
  const clienteId = req.user.id;

  try {
    const cliente = await Clientes.findByPk(clienteId);

    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado.' });
    }

    const senhaAntigaValida = await bcrypt.compare(senhaAntiga, cliente.senha);
    if (!senhaAntigaValida) {
      return res.status(401).json({ error: 'Senha antiga incorreta.' });
    }

    if (novaSenha !== confirmacaoNovaSenha) {
      return res.status(400).json({ error: 'A nova senha e a confirmação não coincidem.' });
    }

    if (novaSenha.includes(req.user.cpf)) {
      return res.status(400).json({ error: 'A nova senha não pode conter seu CPF.' });
    }
    if (!/[A-Z]/.test(novaSenha)) {
      return res.status(400).json({ error: 'A nova senha deve conter pelo menos uma letra maiúscula.' });
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(novaSenha)) {
      return res.status(400).json({ error: 'A nova senha deve conter pelo menos um caractere especial (!@#$%...).' });
    }
    if (novaSenha.length < 8) {
      return res.status(400).json({ error: 'A nova senha deve ter no mínimo 8 caracteres.' });
    }

    const salt = await bcrypt.genSalt(10);
    cliente.senha = await bcrypt.hash(novaSenha, salt);
    await cliente.save();

    res.status(200).json({ message: 'Senha alterada com sucesso!' });

  } catch (error) {
    console.error('Erro ao trocar senha:', error);
    res.status(500).json({ error: 'Erro interno do servidor ao trocar senha.' });
  }
});

// Rota de Login para Administradores com Credenciais Fixas
router.post('/admin-fixed-login', async (req, res) => {
  const { email, senha } = req.body;

  const FIXED_ADMIN_EMAIL = 'adm1@transol.com';
  const FIXED_ADMIN_PASSWORD = 'adm123@';

  try {
    if (email !== FIXED_ADMIN_EMAIL || senha !== FIXED_ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Credenciais de administrador inválidas.' });
    }

    const admin = await Administrador.findOne({ where: { email: FIXED_ADMIN_EMAIL } });

    if (!admin) {
      console.error('Erro: Administrador fixo não encontrado no banco de dados. Por favor, insira um administrador com o email fixo.');
      return res.status(500).json({ error: 'Erro de configuração do administrador.' });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.status(200).json({
      message: 'Login de administrador bem-sucedido!',
      token,
      admin: {
        id: admin.id,
        email: admin.email
      }
    });

  } catch (error) {
    console.error('Erro no login de administrador (fixo):', error);
    res.status(500).json({ error: 'Erro interno do servidor ao fazer login de administrador.' });
  }
});

module.exports = router;
module.exports.verifyToken = verifyToken;
