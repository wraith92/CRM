const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Historique =db.historique_auth;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
exports.signup = (req, res) => {
  console.log(req.body.roles,'dahdha')

  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    
  })
    .then(user => {
      if (!req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
         
          user.setRoles(roles).then(() => {
            res.send({ message: " user was registered successfully!" });
          });
        });
      } else {
        // user role = checkbox
        const roles =req.body.roles;
        if(roles)
        var new_roles = [];
        for (let i = 0; i < roles.length; i++) {
          new_roles.push(roles[i]);
        }
        console.log(new_roles,'nouveau tableau')
        user.setRoles(new_roles).then(() => {
          res.send({ message: "profile was registered successfully!" });
        });
        
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "utilisateur introuvable :(" });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Mot de passe Incorrect!"
        });
      }
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 7200, // 24 hours
      });
      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token,
        message:'connection etablie avec succées :)'
      });
      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
       
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
exports.Post_historique_auth = (req, res) => {
  
  // create connection user 
  const historique = {
    username: req.body.username,
    password: req.body.password,
    message: req.body.message,
    date_connection: new Date(),
 
  };
  // Save Tutorial in the database
  Historique.create(historique)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};
exports.get_historique_auth = (req, res) => {
  Historique.findAll()
    .then(data => {
        res.send(data);
      })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
// Delete all historique_auth from the database.
exports.deleteAll_historique_auth = (req, res) => {
  Historique.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};
exports.delete_historique_auth = (req, res) => {
  const id = req.params.id;

  Historique.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "histrorique de hotentificatio supprimer avec succes:)!"
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe historique de connection was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
}
