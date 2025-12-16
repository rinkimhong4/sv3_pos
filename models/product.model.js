const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const Product = sequelize.define(
  "Product",
  {
    productid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productname: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    discount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0,
    },
    categoryid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_image: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
  },
  {
    tableName: "product_hong_tbl",
    timestamps: false,
  }
);

module.exports = Product;
