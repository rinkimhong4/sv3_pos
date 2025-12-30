const Sequelize = require("./configs/database");
const Category = require("./models/category.model");
const OrderDetail = require("./models/order.detail.model");
const Order = require("./models/order.model");
const Product = require("./models/product.model");
const User = require("./models/user.model");

(async () => {
  try {
    await Sequelize.authenticate();
    console.log("Database connected");

    await Sequelize.sync({ alter: true });
    console.log("Migration completed successfully");

    process.exit();
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
})();
