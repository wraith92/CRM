
const db = require("../models");
const Interlocuteur = db.interlocuteur;
const Op = db.Sequelize.Op;
const nodemailer = require("nodemailer");
const sendConfirmationEmail = (recipientEmail, confirmationLink) => {
  const transporter = nodemailer.createTransport({
    host: "mail.exchangeincloud.com",
    port: 587,
    auth: {
      user: "sofitech_mail_automatique@sofitech.pro",
      pass: "!SOFImail2023",
    },
  });

  const mailOptions = {
    from: "sofitech_mail_automatique@sofitech.pro",
    to: recipientEmail,
    subject: "Confirmation Sofitech",
    html: `
    <p>En cliquant sur le bouton "Confirmer", vous acceptez de partager vos données personnelles avec Sofitech.</p>
      <a href="${confirmationLink}"><button>Confirmer</button></a>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

exports.send_mail_confirmation = (req, res) => {
  const id = req.params.id;

  const confirmationLink = `https://sofcem.mtech.dev/confirmation/${id}`;
  sendConfirmationEmail(data.email, confirmationLink);
};

exports.create_action = (req, res) => {
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
    isConfirmed: req.body.isConfirmed || 0,
  };

  Interlocuteur.create(insert)
    .then(data => {
      const confirmationLink = `https://sofcem.mtech.dev/confirmation/${data.id_interlocuteur}`;
      sendConfirmationEmail(data.email, confirmationLink);
      res.send({ message: 'Interlocuteur ajouté avec succès', data });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Une erreur s'est produite lors de la création de l'interlocuteur.",
      });
    });
};

exports.confirmation = (req, res) => {
  const id = req.params.id;

  // Assurez-vous que id est un entier
  const interlocuteurId = parseInt(id, 10);

  if (isNaN(interlocuteurId)) {
    return res.status(400).send({ message: "L'ID fourni n'est pas un entier valide." });
  }

  // Mettez à jour l'interlocuteur en fonction de l'ID
  Interlocuteur.update({ isConfirmed: 1 }, {
    where: {
      id_interlocuteur: interlocuteurId
    }
  })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Confirmation réussie !" });
      } else {
        res.status(404).send({ message: "Interlocuteur non trouvé avec l'ID fourni." });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
// trouver tous les interlocuteur 
exports.findAll = (req, res) => {
  Interlocuteur.findAll()
    .then(interlocuteurs => {
      res.send(interlocuteurs);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Une erreur s'est produite lors de la récupération des interlocuteurs depuis la base de données."
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
