const { Sequelize } = require("sequelize");
const sequlize = new Sequelize(
  "postgres://postgres:Azizjon.0107@localhost:5432/sello"
);

module.exports = sequlize;
