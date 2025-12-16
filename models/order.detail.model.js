const { DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

const OrderDetail = sequelize.define(
  "OrderDetail",
  {
    odid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    proid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    orid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    discount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: "order_detail_hong_tbl",
    timestamps: false,
  }
);

module.exports = OrderDetail;
