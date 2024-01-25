module.exports = (sequelize, Sequelize) => {
    const ArchivInterlocuteur = sequelize.define("archiv_interlocuteur", {
      // Reprenez ici les champs de votre modèle Interlocuteur
      id_interlocuteur: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nom: {
        type: Sequelize.STRING
      },
      prenom: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      adresse: {
        type: Sequelize.STRING
      },
      code_postale:{
        type:Sequelize.STRING
      },
      tel: {
        type: Sequelize.STRING
      },
      fonction_inter: {
        type: Sequelize.STRING
      }
    
    });
  
    return ArchivInterlocuteur;
  };
  