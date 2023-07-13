
module.exports =(sequelize,Sequelize)=>{
  const Police = sequelize.define("police_cemeca",{
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
    num_easy_coface: {
      type: Sequelize.STRING
    },
    ref_credit_cop:Sequelize.STRING
  });
  return Police;
};
