const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const user = require("../controllers/liste_user.controllers");
module.exports = function(app) {
  // Retrieve all TutorialsÒ
  app.get("/api/test/liste_user", user.findAll,authJwt.verifyToken);

  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
 
  //cemeca lecture  user
  app.get(
    "/api/test/cemeca",
    [authJwt.verifyToken,authJwt.isCemeca],
    controller.cemecaBoard
  );
  //sofitech lecture user
  app.get(
    "/api/test/sofitech",
    [authJwt.verifyToken,authJwt.isSofitech],
    controller.sofitechBoard
  );
   //admin cemeca modifier 
   app.get(
    "/api/test/admin_cemeca",
    [authJwt.verifyToken,authJwt.isAdminCemeca],
    controller.cem_adminhBoard
  );
   //admin sofitech modifier 
   app.get(
    "/api/test/sup_sofitech",
    [authJwt.verifyToken,authJwt.isAdminSofitech],
    controller.sof_adminhBoard
  );
   //admin cemeca modifier 
   app.get(
    "/api/test/sup_cemeca",
    [authJwt.verifyToken,authJwt.isSuperCemeca],
    controller.cem_supBoard
  );

   //admin sofitech modifier 
   app.get(
    "/api/test/admin_sofitech",
    [authJwt.verifyToken,authJwt.isSuperSofitech],
    controller.sof_supBoard
  );


  //super admin all
  app.get( 
    "/api/test/admin-societe",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};
