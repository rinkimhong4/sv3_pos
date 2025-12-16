const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const Category = sequelize.define(
  "Category",
  {
    categoryid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    categoryname: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: "category_hong_tbl",
    timestamps: false,
  }
);

module.exports = Category;
