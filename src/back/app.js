// src/back/app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models');
const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração do CORS
app.use(cors({
    origin: '*', // Em produção, considere restringir para o domínio do seu front-end
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

// Testar conexão com o banco de dados e iniciar o servidor
db.sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');

    // Importar e usar as rotas somente após a conexão e carregamento dos modelos
    const clientesRoutes = require('./routes/clientes');
    const alunoRoutes = require('./routes/aluno');
    const administradorRoutes = require('./routes/administrador');
    const contratoRoutes = require('./routes/contrato');
    const escolarRoutes = require('./routes/escolar');
    const authRoutes = require('./routes/auth');

    app.use('/clientes', clientesRoutes);
    app.use('/alunos', alunoRoutes);
    app.use('/administradores', administradorRoutes);
    app.use('/contratos', contratoRoutes);
    app.use('/escolas', escolarRoutes);
    app.use('/auth', authRoutes);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erro ao conectar ao banco de dados na inicialização:', err);
    process.exit(1);
  });

// Tratador de Erros Global (Mantenha este middleware no final)
app.use((err, req, res, next) => {
    console.error('----------------------------------------------------');
    console.error('ERRO GLOBAL NÃO CAPTURADO:');
    console.error('Nome do Erro:', err.name);
    console.error('Mensagem do Erro:', err.message);
    if (err.errors && Array.isArray(err.errors)) {
      err.errors.forEach((errDetail, index) => {
        console.error(`Detalhe ${index + 1}: Path: ${errDetail.path}, Message: ${errDetail.message}, Value: ${errDetail.value}`);
      });
    }
    console.error('Stack Trace:', err.stack);
    console.error('----------------------------------------------------');
    res.status(500).json({ error: 'Erro interno do servidor (Erro Global)' });
});
