require('dotenv').config();


const express = require('express');
const app = express();

const administradorRoutes = require('./routes/administrador');
const alunoRoutes = require('./routes/aluno');
const clientesRoutes = require('./routes/clientes');
const escolarRoutes = require('./routes/escolar');
const contratoRoutes = require('./routes/contrato');


//Middleware para json
app.use(express.json());


//Rotas
app.use('/administrador', administradorRoutes);
app.use('/aluno', alunoRoutes);
app.use('/clientes', clientesRoutes);
app.use('/escolar', escolarRoutes);
app.use('/contrato', contratoRoutes);



//Servidor
const port = process.env.Port || 3000;
app.listen(process.env.PORT, () => {
    console.log(`App rodando ${port}`);
});
