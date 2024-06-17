const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost", // Endereço do servidor MySQL (geralmente localhost)
  user: "root", // Seu nome de usuário do MySQL
  password: "Amazonia@2008", // Sua senha do MySQL
// database: "smartengMySQL", // Nome do banco de dados que você criou
});

module.exports = connection;
