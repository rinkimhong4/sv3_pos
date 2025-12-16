const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  "sv3_pos", // DB name
  "root", // DB user
  "", // DB password
  {
    host: "localhost",
    dialect: "mysql",
    logging: false,
  }
);

// TEST connection
sequelize
  .authenticate()
  .then(() => console.log("Sequelize connected  successfully"))
  .catch((err) => console.log("DB Error: ", err));

module.exports = sequelize;
