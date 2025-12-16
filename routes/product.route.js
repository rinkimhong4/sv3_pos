const productController = require("../controllers/product.controller");

const products = (app) => {
  // get
  app.get("/api/product", productController.getProduct_hong);
  app.get("/api/product/:id", productController.getProductByID_hong);

  app.post("/api/product/create", productController.createProduct_hong);

  app.put("/api/product/update/:id", productController.updateProduct_hong);
  app.delete("/api/product/delete/:id", productController.deleteProduct_hong);
};

module.exports = { products };
