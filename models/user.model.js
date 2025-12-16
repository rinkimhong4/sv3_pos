const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const User = sequelize.define(
  "User",
  {
    userid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    userpassword: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: "user_hong_tbl",
    timestamps: false,
  }
);

module.exports = User;
