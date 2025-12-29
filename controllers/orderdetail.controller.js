const OrderDetail = require("../models/order.detail.model");
const Product = require("../models/product.model");

// GET ALL
exports.getOrderDetail_hong = async (req, res) => {
  try {
    const data = await OrderDetail.findAll();
    res.json({
      statusCode: 200,
      message: "Get Data Successfully",
      data:data
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

// GET ONE DATA

exports.getOrderDetailByID_hong = async (req, res) => {
  try {
    const { id } = req.params;

    if (!Number.isInteger(Number(id)) || id <= 0) {
      return res.status(400).json({ message: "ID must be a positive integer" });
    }

    const detail = await OrderDetail.findByPk(id);

    if (!detail) {
      return res.status(404).json({ message: "OrderDetail not found" });
    }

    res.json({
      statusCode: 200,
      message: "Get Data Successfully",
      detail : detail,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

// CREATE
exports.createOrderDetail_hong = async (req, res) => {
  try {
    const { proid, orid, qty, discount } = req.body;
    const product = await Product.findByPk(proid);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (!proid || !orid || !qty) {
      return res.status(400).json({
        message: "proid, orid, and qty are required",
      });
    }

    if (
      !Number.isInteger(proid) ||
      !Number.isInteger(orid) ||
      !Number.isInteger(qty) ||
      qty <= 0
    ) {
      return res.status(400).json({
        statusCode: 400,
        message:
          "proid, orid must be integers and qty must be positive integer",

      });
    }

    const orderDetail = await OrderDetail.create({
      proid,
      orid,
      qty,
      discount: discount || 0,
    });

    res.status(201).json({
      statusCode: 201,
      message: "OrderDetail created successfully",
      orderDetail : orderDetail,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

// UPDATE
exports.updateOrderDetail_hong = async (req, res) => {
  try {
    const { id } = req.params;
    const { proid, orid, qty, discount } = req.body;

    if (!Number.isInteger(Number(id)) || id <= 0) {
      return res.status(400).json({ message: "ID must be a positive integer" });
    }

    const detail = await OrderDetail.findByPk(id);
    if (!detail) {
      return res.status(404).json({ message: "OrderDetail not found" });
    }

    await OrderDetail.update(
      { proid, orid, qty, discount },
      { where: { odid: id } }
    );

    res.status(202).json({
      statusCode: 202,
      message: "OrderDetail updated successfully",
      detail : detail,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

//  DELETE
exports.deleteOrderDetail_hong = async (req, res) => {
  try {
    const { id } = req.params;

    if (!Number.isInteger(Number(id)) || id <= 0) {
      return res.status(400).json({ message: "ID must be a positive integer" });
    }

    const detail = await OrderDetail.findByPk(id);
    if (!detail) {
      return res.status(404).json({ message: "OrderDetail not found" });
    }

    await OrderDetail.destroy({
      
      where: { odid: id }
    });

    res.json({
      statusCode: 200,
      message: "OrderDetail deleted successfully"
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
