const Order = require("../models/order.model");
const User = require("../models/user.model");

// GET ALL
exports.getOrder_hong = async (req, res) => {
  try {
    const data = await Order.findAll();
    res.json({
      statusCode: 200,
      message: "Get Data Successfully",
      data : data,
    }); 
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: "Server error",
      error: err.message,
    });
  }
};

// GET ONE DATA
exports.getOrderByID_hong = async (req, res) => {
  try {
    const id = req.params.id;
    if (!Number.isInteger(Number(id)) || id <= 0) {
      return res.status(400).json({
        message: "ID must be a positive integer",
      });
    }

    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({
        statusCode: 404,
        message: "Data not found"
      });
    }
    res.json({
      statusCode: 200,
      message: "Get Data Successfully",
      data:
      order
    });
  } catch (err) {
    res.status(500).json({ message: "Server error:", err });
  }
};

// CREATE
exports.createOrder_hong = async (req, res) => {
  try {
    const { orderdate, orderno, userid } = req.body;

    if (!orderdate || !orderno || !userid) {
      return res.status(400).json({
        message: "orderdate, orderno, and userid are required",
      });
    }

    const user = await User.findByPk(userid);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const existingOrder = await Order.findOne({
      where: { orderno },
    });

    if (existingOrder) {
      return res.status(400).json({
        message: "Order number already exists",
      });
    }

    const order = await Order.create({
      orderdate,
      orderno,
      userid,
    });

    res.status(201).json({
      statusCode: 201,
      message: "Order created successfully",
      order: order,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

// UPDATE
exports.updateOrder_hong = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderdate, orderno, userid } = req.body;

    if (!Number.isInteger(Number(id)) || id <= 0) {
      return res.status(400).json({
        message: "ID must be a positive integer",
      });
    }

    const existingOrder = await Order.findByPk(id);
    if (!existingOrder) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    await Order.update(
      { orderdate, orderno, userid },
      { where: { orderid: id } }
    );

    res.status(202).json({
      statusCode: 202,
      message: "Order updated successfully",
      order: existingOrder,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

// DELETE
exports.deleteOrder_hong = async (req, res) => {
  try {
    const { id } = req.params;

    if (!Number.isInteger(Number(id)) || id <= 0) {
      return res.status(400).json({
        message: "ID must be a positive integer",
      });
    }

    const existingOrder = await Order.findByPk(id);
    if (!existingOrder) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    await Order.destroy({
      where: { orderid: id },
    });

    res.status(200).json({
      statusCode: 200,
      message: "Order deleted successfully",
      order: existingOrder,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};
