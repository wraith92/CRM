//route ajouter societer 
const Action = require("../controllers/actions.controllers");

module.exports = function(app) {
  app.post("/api/auth/action", Action.create_action);
  app.get("/api/auth/action", Action.findAll);
  app.put("/api/auth/action/update/:id", Action.update);
};



