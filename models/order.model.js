const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const Order = sequelize.define(
  "Order",
  {
    orderid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    orderdate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    orderno: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "order_hong_tbl",
    timestamps: false,
  }
);

module.exports = Order;
