const orderController = require("../controllers/order.controller");

const orders = (app) => {
  // get
  app.get("/api/order", orderController.getOrder_hong);
  app.get("/api/order/:id", orderController.getOrderByID_hong);
  app.post("/api/order/create", orderController.createOrder_hong);
  app.put("/api/order/update/:id", orderController.updateOrder_hong);
  app.delete("/api/order/delete/:id", orderController.deleteOrder_hong);
};

module.exports = { orders };
