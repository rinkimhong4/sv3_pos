const User = require("../models/user.model");

// GET ALL
exports.getUser_hong = async (req, res) => {
  try {
    const data = await User.findAll();
    res.status(200).json({
      statusCode: 200,
      message: "Get Data Successfully",
      data
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

// GET ONE DATA
exports.getUserByID_hong = async (req, res) => {
  try {
    const id = req.params.id;
    if (!Number.isInteger(Number(id)) || id <= 0) {
      return res.status(400).json({
        message: "ID must be a positive integer",
      });
    }

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "USer not found" });
    }
    res.status(200).json({
      statusCode: 200,
      message: "Get Data Successfully",
      data : user
    });
  } catch (err) {
    res.status(500).json({ message: "Server error:", err });
  }
};

// CREATE
exports.createUser_hong = async (req, res) => {
  try {
    const existingUser = await User.findOne({
      where: { username: req.body.username },
    });
    if (existingUser) {
      return res.status(400).json({
        message: "Username already exists",
        existingUser,
      });
    }

    const user = req.body;
    await User.create(req.body);
    res.status(201).json({
      statusCode: 201,
      message: "User created",
     data: user,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error: ", err });
  }
};

// UPDATE
exports.updateUser_hong = async (req, res) => {
  try {
    let existingUser = await User.findOne({
      where: { username: req.body.username },
    });
    if (existingUser) {
      return res.status(400).json({
        message: "Username already exists",
        existingUser,
      });
    }

    await User.update(req.body, {
      where: { userid: req.params.id },
    });
    res.status(202).json({
      statusCode: 202,
      message: "User updated successfully",
      data : req.body,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error: ", err });
  }
};

// DELETE
exports.deleteUser_hong = async (req, res) => {
  const { id } = req.params;
  if (!Number.isInteger(Number(id)) || id <= 0) {
    return res.status(400).json({
      message: "ID must be a positive integer",
    });
  }

  const existingUSer = await User.findByPk(id);
  if (!existingUSer) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  await User.destroy({
    where: {
      userid: req.params.id,
    },
  });
  res.status(200).json({
    statusCode: 200,
    message: "Username deleted",
    data : existingUSer,
  });
};
