const Product = require("../models/product.model");
const Category = require("../models/category.model");

const { Op } = require("sequelize");
// GET ALL
exports.getProduct_hong = async (req, res) => {
  try {
    const data = await Product.findAll();
    res.status(200).json({
      statusCode: 200,
      message: "Get Data Successfully",
      data : data,
    });
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
        statusCode: 400,
        message: "ID must be a positive integer",
      });
    }

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({
      statusCode: 200,
      message: "Get Data Successfully",
     data: product
    });
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

    if (Number.isInteger(qty) || qty < 0) {
      return res
        .status(400)
        .json({ message: "qty must be a non-negative integer" });
    }

    if (isNaN(price) || price < 0) {
      return res
        .status(400)
        .json({
          statusCode: 400,
          message: "price must be a non-negative number"
        });
    }

    const existingProduct = await Product.findOne({ where: { productname } });
    if (existingProduct) {
      return res.status(400).json({
        statusCode: 400,
        message: "Product name already exists"
      });
    }

    const product = await Product.create({
      productname,
      qty,
      price,
      discount: discount || 0,
      categoryid,
      product_image: req.file ? req.file.filename : null
    });

    res.status(201).json({
      statusCode: 201,
      message: "Product created successfully",
      data : product,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};
exports.updateProduct_hong = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { productname, qty, price, discount, categoryid } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ message: "ID must be a positive integer" });
    }

    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Check duplicate product name (exclude current product)
    if (productname) {
      const existingProduct = await Product.findOne({
        where: {
          productname,
          productid: { [Op.ne]: id },
        },
      });
      if (existingProduct) {
        return res.status(400).json({ message: "Product name already exists" });
      }
    }

    // Check category
    if (categoryid) {
      const category = await Category.findByPk(categoryid);
      if (!category) return res.status(404).json({ message: "Category not found" });
    }

    // Update product (including optional image)
    await product.update({
      productname: productname ?? product.productname,
      qty: qty ?? product.qty,
      price: price ?? product.price,
      discount: discount ?? product.discount,
      categoryid: categoryid ?? product.categoryid,
      product_image: req.file ? req.file.filename : product.product_image,
    });

    res.status(200).json({
      statusCode: 200,
      message: "Product updated successfully",
      data: product,
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

    res.status(200).json({
      statusCode: 200,
      message: "Product deleted successfully",
      data : product,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
