const mysql = require("mysql");
const dbConfig = require("./mysqlConfig");

var connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

connection.connect((error) => {
    if (error) throw error;
    console.log('Connected to MySQL database!');
  });
module.exports = connection;