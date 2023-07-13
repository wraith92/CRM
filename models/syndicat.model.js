
module.exports =(sequelize,Sequelize)=>{
  const Syndicat = sequelize.define("syndicats",{
    nom: {
      type: Sequelize.STRING,
    }
 
  });
  return Syndicat;
};
