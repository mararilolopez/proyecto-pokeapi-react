var mysql = require("mysql");
require("dotenv").config();
var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});
connection.connect((error) => {
  if (error) throw error;
  console.log("Conexión DB correcta");
  console.log("####################################");
  console.log("Server starter port: 4000");
  console.log("####################################");
});
module.exports = connection;
