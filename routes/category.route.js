const categoryController = require("../controllers/category.controller");
const upload = require("../middlewares/upload");
const categories = (app) => {
  // get
  app.get("/api/categories", categoryController.getCategory_hong);
  app.get("/api/categories/:id", categoryController.getCategoryByID_hong);

  app.post("/api/categories/create",
      upload.single("categoryicon"),
    categoryController.createCategory_hong);

  app.put("/api/categories/update/:id",
    upload.single("categoryicon"),
    categoryController.updateCategory_hong);
  app.delete(
    "/api/categories/delete/:id",
    categoryController.deleteCategory_hong
  );
};

module.exports = { categories };
