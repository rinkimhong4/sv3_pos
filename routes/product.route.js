const productController = require("../controllers/product.controller");
const upload = require("../middlewares/upload");
const products = (app) => {
  // get
  app.get("/api/product", productController.getProduct_hong);
  app.get("/api/product/:id", productController.getProductByID_hong);

  app.post("/api/product/create",
    upload.single("product_image"),
    productController.createProduct_hong);

  app.put("/api/product/update/:id",
     upload.single("product_image"),
    productController.updateProduct_hong);
  app.delete("/api/product/delete/:id", productController.deleteProduct_hong);
};

module.exports = { products };
