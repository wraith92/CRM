//variable d'environement
const express = require("express");
const cors = require("cors");
const path =require('path')
const proxy = require('express-http-proxy');
const app = express();
const PORT = process.env.PORT || 8080 ;
const axios = require("axios")
const db = require("./models");
const { user } = require("./models");
const { hostname } = require("os");
const Role = db.role;
const User = db.user;
const Societe = db.societe;
var corsOptions = {
  origin: "https://sofcem.mtech.dev"
};

app.use(cors(corsOptions));
console.log(cors(corsOptions))
app.use(express.static(path.join(__dirname , "client","build")))
//all path in front end 
app.get('/register', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
app.get('/login', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
app.get('/Ajouter', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
app.get('/Societes', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
app.get('/Societe/:id', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
app.get('/AllAction', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
app.get('/modifier/:id', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
app.get('/Action/:id', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.get('/Actions/modifier/:id', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
app.get('/Inter/modifier/:id', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
app.get('/Interl', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
app.get('/Interlocuteur/:id', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
app.get('/user/:id', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
app.get('/admin', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
app.get('/User/Info/:id', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));



// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/societes')(app);
require('./routes/action')(app);
require('./routes/interlocuteur')(app);




//role insert data en dure 
function initial() {
  Role.create({
    id: 1,
    name: "cemeca"
  });
 
  Role.create({
    id: 2,
    name: "sofitech"
  });
 
  Role.create({
    id: 3,
    name: "admin_cemaca"
  });
  Role.create({
    id: 4,
    name: "admin_sofitech"
  });
  Role.create({
    id: 5,
    name: "super_cemeca"
  });
  Role.create({
    id: 6,
    name: "super_sofitech"
  });
  Role.create({
    id: 7,
    name: "super_admin1"
  });
  Role.create({
    id: 8,
    name: "super_admin"
  });
}
/* Get hostname of os in Node.js */
let mysql = require('mysql2');

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Adminsqlsofcem3/',
  database: 'sofcem_base_crm'
});

connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

  console.log('Connected to the MySQL server.');
});

//syncroniser la base de donner 

/*
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});
*/

//listen port 
app.listen(PORT,'144.91.97.91', () => {
  console.log(`Server is running `);
});

