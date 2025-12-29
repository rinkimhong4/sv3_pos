const userController = require("../controllers/user.controller");

const users = (app) => {
  // get
  app.get("/api/user", userController.getUser_hong);
  app.get("/api/user/:id", userController.getUserByID_hong);

  // create
  app.post("/api/user/create", userController.createUser_hong);

  // update
  app.put("/api/user/update/:id", userController.updateUser_hong);

  // delete
  app.delete("/api/user/delete/:id", userController.deleteUser_hong);
};

module.exports = { users };
