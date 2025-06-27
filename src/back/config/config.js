// src/back/config/config.js
require('dotenv').config();

module.exports = {
  "development": {
    // Para desenvolvimento local, pode usar um DB local ou o Azure (como estava para depuracao)
    "username": process.env.DB_USERNAME_DEV || 'root',
    "password": process.env.DB_PASSWORD_DEV || null,
    "database": process.env.DB_NAME_DEV || 'transol_dev',
    "host": process.env.DB_HOST_DEV || 'localhost',
    "port": process.env.DB_PORT_DEV || 3306,
    "dialect": 'mysql',
    "logging": true,
    "dialectOptions": {
      "ssl": {
        "require": false, // Nao exigir SSL em desenvolvimento local
        "rejectUnauthorized": false
      }
    }
  },

  "test": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PWD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "dialect": 'mysql',
    "logging": true
  },

  "production": {
    // <<< AGORA BUSCA AS VARIAVEIS DE AMBIENTE PARA PRODUCAO >>>
    "username": process.env.DB_USERNAME_PROD,
    "password": process.env.DB_PASSWORD_PROD,
    "database": process.env.DB_NAME_PROD,
    "host": process.env.DB_HOST_PROD,
    "port": process.env.DB_PORT_PROD || 3306, // Use PORT_PROD ou 3306
    "dialect": 'mysql',
    "logging": false,
    "dialectOptions": {
      "ssl": {
        "require": true // Azure MySQL exige SSL em producao
      }
    }
  }
};
