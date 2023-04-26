module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "Adminsqlsofcem3/",
  DB: "sofcem_base_crm",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};