const cors = require("cors");
const express = require("express");
const route_front=['register','Societes','Societe/:id','Interlocuteur/:id','ajouter','Interlocuteur','login','Action/:id','/Actions/modifier/:id','/Interl']

module.exports = function(app) {

   //cors
    const path = require("path");
    var corsOptions = {
      origin: "https://sofcem.mtech.dev"
    };
    app.use(cors(corsOptions));
    //route front end 
    for (let i = 0; i < route_front.length; i++) {
      app.get('/'+route_front[i], (req, res) =>
      res.sendFile(path.join(__dirname, '../../client/build/index.html'))
    );
    
    }

    //all routes react front end 
      app.use(express.static(path.join(__dirname, '../../client/build')));

}
