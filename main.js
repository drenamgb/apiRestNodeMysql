/* global process */

const express = require("express");
const app = express();
const mysql = require("mysql");
app.use(express.json());
require('dotenv').config();

 const config = require("./src/db.js");
 const connection = config.connection;
 
 
app.get("/getUsers",function(req,res){
    connection.query("select * from alunos",function(error,result){
        if(error) throw res.json(error);
        res.json({result});
    });   
});


app.post("/createUser",function(req,res){      
    connection.query("insert into alunos (nome,idade) values ('"+req.body.nome+"',"+req.body.idade+")",function(error,result){
        if(error) throw res.json(error);
        res.json({result}); 
    });
});


app.put("/updateUserbyId",function(req,res){
    connection.query("update alunos set nome = '"+req.body.nome+"' , idade = "+req.body.idade+" where idalunos = "+req.body.id,function(error,result){
       if(error) throw res.json(error); 
       res.json({result});
    });
});

app.delete("/deleteUserbyId",function(req,res){
    connection.query("delete from alunos where idalunos = "+req.body.id,function(error,result){
        if(error) throw res.json(error);
        res.json({result});
    });
});


app.get("/busca-cep",function(req,res){
   const buscaCep = require("busca-cep");
   
   var cep = req.body.cep;
   
   buscaCep(cep,{sync:false,timeout:1000}).then(function(endereco){
        res.json(endereco);
   }).catch(function(error){
        res.json(error);
   });
});


app.listen(process.env.PORT || 8082);