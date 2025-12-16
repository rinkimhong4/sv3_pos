const Product = require("../models/product.model");
const Category = require("../models/category.model");

// GET ALL
exports.getProduct_hong = async (req, res) => {
  try {
    const data = await Product.findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

// GET ONE DATA
exports.getProductByID_hong = async (req, res) => {
  try {
    const id = req.params.id;
    if (!Number.isInteger(Number(id)) || id <= 0) {
      return res.status(400).json({
        message: "ID must be a positive integer",
      });
    }

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error:", err });
  }
};

// CREATE
exports.createProduct_hong = async (req, res) => {
  try {
    const { productname, qty, price, discount, categoryid, product_image } =
      req.body;

    if (!productname || qty == null || price == null || !categoryid) {
      return res.status(400).json({
        message: "productname, qty, price, and categoryid are required",
      });
    }

    const category = await Category.findByPk(categoryid);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    if (!Number.isInteger(qty) || qty < 0) {
      return res
        .status(400)
        .json({ message: "qty must be a non-negative integer" });
    }

    if (isNaN(price) || price < 0) {
      return res
        .status(400)
        .json({ message: "price must be a non-negative number" });
    }

    const existingProduct = await Product.findOne({ where: { productname } });
    if (existingProduct) {
      return res.status(400).json({ message: "Product name already exists" });
    }

    const product = await Product.create({
      productname,
      qty,
      price,
      discount: discount || 0,
      categoryid,
      product_image: product_image || null,
    });

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

// UPDATE
exports.updateProduct_hong = async (req, res) => {
  try {
    const { id } = req.params;
    const { productname, qty, price, discount, categoryid, product_image } =
      req.body;

    if (!Number.isInteger(Number(id)) || id <= 0) {
      return res.status(400).json({ message: "ID must be a positive integer" });
    }
    let existingProduct = await Product.findOne({
      where: { productname: req.body.productname },
    });
    if (existingProduct) {
      return res.status(400).json({
        message: "Product name already exists",
        existingProduct,
      });
    }

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const category = await Category.findByPk(categoryid);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await Product.update(
      { productname, qty, price, discount, categoryid, product_image },
      { where: { productid: id } }
    );

    res.status(202).json({
      message: "Product updated successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

//  DELETE
exports.deleteProduct_hong = async (req, res) => {
  try {
    const { id } = req.params;

    if (!Number.isInteger(Number(id)) || id <= 0) {
      return res.status(400).json({ message: "ID must be a positive integer" });
    }

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product ID not found" });
    }

    await Product.destroy({ where: { productid: id } });

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
