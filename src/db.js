/* global process */

const mysql = require("mysql");

const connection = mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
});

connection.connect(function(error){
    if(error) {        
        console.log("erro de conexao: " + error.stack);
        return ;
    }
    console.log("conectado");
});

module.exports ={
    connection : connection
};
