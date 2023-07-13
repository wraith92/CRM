//route ajouter societer 
const interlocuteur = require("../controllers/interlocuteur.controllers");

module.exports = function(app) {
 
  
  app.post("/api/auth/interlocuteur", interlocuteur.create_action);
  app.get("/api/auth/interlocuteur", interlocuteur.findAll);
  app.put("/api/auth/interlocuteur/update/:id", interlocuteur.update);
  
};
