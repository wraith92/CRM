
const tutorials = require("../controllers/societe.controllers");
module.exports = function(app) {
// Retrieve all Tutorials
app.get("/allsociete", tutorials.findAll);
//route all societe where role is cemeca 
app.get("/cemeca", tutorials.findAll_cemeca);
//route all societe where role is sofitech  
app.get("/sofitech", tutorials.findAll_sofitech);
  // //route all societe where id
app.get("/api/auth/societe/:id", tutorials.findOne);
//route ajouter societer 
app.post("/api/auth/ajouter", tutorials.create_societe);
//route modifier la societer 
app.put("/api/auth/societe/update/:id", tutorials.update);
};


 