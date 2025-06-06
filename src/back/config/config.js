// src/back/config/config.js
require('dotenv').config();

module.exports = {
  "development": {
    // Hardcoding values for CLI reliability during development/migrations.
    // Ensure these match your Azure DB credentials for local CLI operations.
    "username": 'tatianemares', // Your actual Azure DB username
    "password": 'Transol123@',   // Your actual Azure DB password
    "database": 'transol',       // Your actual Azure DB name
    "host": 'meu-db-pucminas.mysql.database.azure.com', // Your actual Azure DB host
    "port": 3306, // Your actual Azure DB port
    "dialect": 'mysql',
    "logging": true, // Keep logging on for development
    "dialectOptions": {
      "ssl": {
        "require": true, // Azure requires SSL
        "rejectUnauthorized": false // May be needed for local connection without full CA cert setup
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
    // Hardcoding values for CLI reliability during production migrations.
    // In a deployed application, these should still come from process.env.
    // Ensure these match your Azure DB credentials!
    "username": 'tatianemares', // Your actual Azure DB username
    "password": 'Transol123@',   // Your actual Azure DB password
    "database": 'transol',       // Your actual Azure DB name
    "host": 'meu-db-pucminas.mysql.database.azure.com', // Your actual Azure DB host
    "port": 3306, // Your actual Azure DB port
    "dialect": 'mysql',
    "logging": false, // Disable logging in production
    "dialectOptions": {
      "ssl": {
        "require": true
      }
    }
  }
};
