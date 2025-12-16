const Category = require("../models/category.model");

// GET ALL
exports.getCategory_hong = async (req, res) => {
  try {
    const data = await Category.findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

// GET ONE DATA
exports.getCategoryByID_hong = async (req, res) => {
  try {
    const id = req.params.id;
    if (!Number.isInteger(Number(id)) || id <= 0) {
      return res.status(400).json({
        message: "ID must be a positive integer",
      });
    }

    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: "Data not found" });
    }
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: "Server error:", err });
  }
};

// CREATE
exports.createCategory_hong = async (req, res) => {
  try {
    let category = req.body;
    let existingCategory = await Category.findOne({
      where: { categoryname: req.body.categoryname },
    });

    if (existingCategory) {
      return res.status(400).json({
        message: "Category name already exists",
        existingCategory,
      });
    }

    await Category.create(req.body);
    res.status(201).json({
      message: "Category created",
      category,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error: ", err });
  }
};

// UPDATE
exports.updateCategory_hong = async (req, res) => {
  try {
    let existingCategory = await Category.findOne({
      where: { categoryname: req.body.categoryname },
    });
    if (existingCategory) {
      return res.status(400).json({
        message: "Category name already exists",
        existingCategory,
      });
    }
    await Category.update(req.body, {
      where: { categoryid: req.params.id },
    });
    res.status(202).json({
      message: "Category updated",
      category,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error: ", err });
  }
};

// DELETE
exports.deleteCategory_hong = async (req, res) => {
  const { id } = req.params;
  if (!Number.isInteger(Number(id)) || id <= 0) {
    return res.status(400).json({
      message: "ID must be a positive integer",
    });
  }

  const existingCategory = await Category.findByPk(id);
  if (!existingCategory) {
    return res.status(404).json({
      message: "Category not found",
    });
  }
  await Category.destroy({
    where: {
      categoryid: req.params.id,
    },
  });
  res.json({
    message: "Category deleted",
  });
};
