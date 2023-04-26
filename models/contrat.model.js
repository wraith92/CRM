
module.exports =(sequelize,Sequelize)=>{
  const Contrat = sequelize.define("contrats",{
    id_contrat: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    date_contrat: {
      type: Sequelize.DATE
    },
    detail: {
      type: Sequelize.INTEGER
    },
    status: {
      type: Sequelize.BOOLEAN
    },
    message: {
      type: Sequelize.STRING
    },
    ref_credit_cop:Sequelize.STRING
  });
  return Contrat;
};
