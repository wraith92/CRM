
const db = require("../models");
const Interlocuteur = db.interlocuteur;
const User = db.user;
const ArchivInterlocuteur = db.archivInterlocuteur;
const Op = db.Sequelize.Op;
const nodemailer = require("nodemailer");
const sendConfirmationEmail = (recipientEmail, confirmationLink, nom, prenom) => {
  const transporter = nodemailer.createTransport({
    host: "mail.exchangeincloud.ch",
    port: 587,
    auth: {
      user: "sofitech_mails@sofitech.pro",
      pass: "Gd2Bc19*",
    },
  });
  const logoUrl = "https://sofitech.pro/wp-content/uploads/2018/12/Groupe-1.png";
  const mailOptions = {
    from: "sofitech_mail_automatique@sofitech.pro",
    to: recipientEmail,
    subject: "Confirmation Sofitech",
    html: `
    <p><img src="${logoUrl}" alt="Sofitech Logo" style="max-width: 100%; height: auto;"></p>
      <p>Bienvenue chez Sofitech !</p>
      <p>Madame, Monsieur ${nom} ${prenom},</p>
      <p>Dans le cadre de nos derniers échanges, vous nous avez communiqué vos coordonnées, ainsi que vos données.</p>
      <p>
  En cliquant sur « j’accepte », vous acceptez que vos données personnelles recueillies par
  CMGM Sofitech soient conservées en conformité avec la note d’information sur le traitement
  des données personnelles de la CMGM SOFITECH disponible sur notre site internet
  (https://sofitech.pro/mentions-legales).
</p>
      <a href="${confirmationLink}"><button>Confirmer</button></a>
      <p>
  Espérant vous accompagner dans vos divers projets.
</p>
<p>
  Au plaisir de poursuivre nos échanges.
</p>
<p>
  Bien cordialement,
</p>
<p>
  L’équipe SOFITECH
</p>
<p style="color:blue;">
  En application de la loi « informatique et libertés » du 6 janvier 1978 modifiée, et du Règlement
  Général sur la Protection des Données (RGPD 2016/679 (UE), vous disposez à tout moment d’un
  droit d’accès, de rectification, de portabilité et d’effacement de vos données ou encore de limitation de
  traitement. Vos données sont utilisées uniquement dans le cadre de notre activité de caution mutuelle
  et ne font l’objet d’aucune vente à un tiers. Vous pouvez également, pour des motifs légitimes, vous
  opposer au traitement des données vous concernant. Pour exercer l’un de ces droits ou obtenir des
  informations supplémentaires, adressez-nous un courrier électronique à l’adresse suivante :
  accueil@sofitech.pro
</p>
<p>
  Dans le respect de la réglementation et le cadre uniquement de notre activité de cautionnement, vos
  données sont susceptibles d’être partagées avec nos partenaires.
</p>
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

exports.send_mail_confirmation = async (req, res) => {
  const id = req.params.id;

  try {
    // Assuming you have a Sequelize model named Interlocuteu

    const interlocuteur = await Interlocuteur.findOne({
      where: {
        id_interlocuteur: id,
      },
    });

    if (!interlocuteur) {
      return res.status(404).send({ message: "Interlocuteur not found with the provided ID." });
    }

    const confirmationLink = `https://sofcem.mtech.dev/confirmation/${id}`;
    sendConfirmationEmail(interlocuteur.email, confirmationLink, interlocuteur.nom, interlocuteur.prenom);

    res.send({ message: "interlocuteur send succefuly " });
  } catch (err) {
    res.status(500).send({ message: err.message || "Error retrieving Interlocuteur." });
  }
};


exports.create_action = (req, res) => {
  const insert = {
    nom: req.body.nom,
    prenom: req.body.prenom,
    email: req.body.email,
    adresse: req.body.adresse,
    code_postale: req.body.code_postale,
    tel: req.body.tel,
    fonction_inter: req.body.fonction_inter,
    id_utili: req.body.id_utili,
    id_soc: req.body.id_soc,
    isConfirmed: req.body.isConfirmed || 0,
  };

  Interlocuteur.create(insert)
    .then(data => {
      const confirmationLink = `https://sofcem.mtech.dev/confirmation/${data.id_interlocuteur}`;
      sendConfirmationEmail(data.email, confirmationLink, data.nom, data.prenom);
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



exports.archiveInterlocuteur = async (req, res) => {
  const today = new Date();
  const tenDaysAgo = new Date(today);
  tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const transporter = nodemailer.createTransport({
    host: "mail.exchangeincloud.ch",
    port: 587,
    auth: {
      user: "sofitech_mails@sofitech.pro",
      pass: "Gd2Bc19*",
    },
  });

  try {
    // Fetch interlocutors for reminder after 10 days
    const interlocuteursForReminder = await Interlocuteur.findAll({
      include: [{ model: db.user, as: 'user', attributes: ['email'] }],
      where: {
        createdAt: {
          [Op.gte]: tenDaysAgo,
          [Op.lt]: today,
        },
        isConfirmed: 0,
        reminderSent: 0, // Check that the reminder hasn't been sent yet
      },
    });

    // Send reminder email
    for (const interlocuteur of interlocuteursForReminder) {
      const reminderMailOptions = {
        from: 'sofitech_mails@sofitech.pro',
        to: interlocuteur.email,
        subject: 'Rappel de confirmation',
        text: `Bonjour ${interlocuteur.nom}, vous avez initié une procédure il y a 10 jours. Veuillez confirmer vos informations.`,
      };

      try {
        await transporter.sendMail(reminderMailOptions);
        console.log(`Rappel envoyé à l'interlocuteur: ${interlocuteur.email}`);
        // Update the reminderSent flag
        await Interlocuteur.update({ reminderSent: 1 }, {
          where: { id_interlocuteur: interlocuteur.id_interlocuteur },
        });
      } catch (emailError) {
        console.error("Erreur lors de l'envoi du rappel: ", emailError);
      }
    }

    // Fetch interlocutors for archiving/deleting after 30 days
    const interlocuteursAExpirer = await Interlocuteur.findAll({
      include: [{ model: db.user, as: 'user', attributes: ['email'] }],
      where: {
        createdAt: {
          [Op.lt]: thirtyDaysAgo,
        },
        isConfirmed: 0,
      },
    });

    for (const interlocuteur of interlocuteursAExpirer) {
      console.log(`Traitement de l'interlocuteur ID: ${interlocuteur.id_interlocuteur}`);

      await ArchivInterlocuteur.create(interlocuteur.dataValues);
      console.log(`Interlocuteur archivé: ${interlocuteur.id_interlocuteur}`);

      try {
        await Interlocuteur.destroy({
          where: { id_interlocuteur: interlocuteur.id_interlocuteur },
        });
        console.log(`Interlocuteur supprimé: ${interlocuteur.id_interlocuteur}`);
      } catch (deleteError) {
        console.error(`Erreur lors de la suppression de l'interlocuteur ID: ${interlocuteur.id_interlocuteur}`, deleteError);
      }

      // Envoyer des e-mails de notification de suppression
      const mailOptionsInterlocuteur = {
        from: 'sofitech_mails@sofitech.pro',
        to: interlocuteur.email,
        subject: 'Notification de suppression',
        text: 'Votre compte a été supprimé en raison de non confirmation dans les 30 jours suivant votre inscription.'
      };

      const mailOptionsUser = {
        from: 'sofitech_mails@sofitech.pro',
        to: interlocuteur.user.email,
        subject: 'Notification de suppression d\'interlocuteur',
        text: `L'interlocuteur ${interlocuteur.nom} ${interlocuteur.prenom} a été supprimé après 30 jours sans confirmation.`
      };

      try {
        await transporter.sendMail(mailOptionsInterlocuteur);
        console.log(`E-mail de suppression envoyé à l'interlocuteur: ${interlocuteur.email}`);
        await transporter.sendMail(mailOptionsUser);
        console.log(`E-mail de suppression envoyé à l'utilisateur associé: ${interlocuteur.user.email}`);
      } catch (emailError) {
        console.error("Erreur d'envoi d'e-mail de suppression: ", emailError);
      }
    }

    res.send({
      reminderCount: interlocuteursForReminder.length,
      archivedCount: interlocuteursAExpirer.length,
      message: `Rappels envoyés: ${interlocuteursForReminder.length}, interlocuteurs archivés/supprimés: ${interlocuteursAExpirer.length}`,
    });
  } catch (err) {
    console.error("Erreur lors de l'opération: ", err);
    res.status(500).send({ message: err.message || "Erreur lors du processus de rappel/archivage." });
  }
};


