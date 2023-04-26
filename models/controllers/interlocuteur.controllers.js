const db = require("../models");
const Interlocuteur = db.interlocuteur;
const Op = db.Sequelize.Op;
// Create and Save a new Societes
exports.create_action = (req, res) => {
  // Create a societes
  const insert = {
    nom:req.body.nom,
    prenom:req.body.prenom,
    email:req.body.email,
    adresse:req.body.adresse,
    code_postale:req.body.code_postale,
    tel:req.body.tel,
    fonction_inter:req.body.fonction_inter,
    id_utili: req.body.id_utili,
    id_soc:req.body.id_soc,
   
  };
  
  console.log(insert)
  console.log(Interlocuteur)
  // Save Tutorial in the database
  Interlocuteur.create(insert)
    .then(data => {
      res.send({message:'Interlocuteur ajouter avec succée ',data});
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};
// trouver tous les interlocuteur 
exports.findAll = (req, res) => {
  Interlocuteur.findAll().then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
// modify Interlocuteur
exports.update = (req, res) => {
  const id = req.params.id;

  Interlocuteur.update(req.body, {
    where: { id_interlocuteur: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Interlocuteur modifier avec succes."
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};
