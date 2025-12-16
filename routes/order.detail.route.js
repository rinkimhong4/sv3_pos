const orderDetailController = require("../controllers/orderdetail.controller");

const orderDetail = (app) => {
  // get
  app.get("/api/orderDetail", orderDetailController.getOrderDetail_hong);
  app.get(
    "/api/orderDetail/:id",
    orderDetailController.getOrderDetailByID_hong
  );
  app.post(
    "/api/orderDetail/create",
    orderDetailController.createOrderDetail_hong
  );
  app.put(
    "/api/orderDetail/update/:id",
    orderDetailController.updateOrderDetail_hong
  );
  app.delete(
    "/api/orderDetail/delete/:id",
    orderDetailController.deleteOrderDetail_hong
  );
};

module.exports = { orderDetail };
