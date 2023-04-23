const mysql = require("mysql2");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("bitnami", process.env.DB_USER, process.env.DB_PASSWORD, {
  host: "localhost",
  dialect: "mysql"
});

sequelize.authenticate()
  .then(() => {
    console.log("Connected to MySQL database");
  })
  .catch((err) => {
    console.log("Error while connecting to MySQL database : ", err);
  });

module.exports = sequelize;
