const express = require("express");
const router = express.Router();
const clientUserController = require("../controllers/client_user.controller");

// get all users
router.get("/getAllUsers", clientUserController.getAllUsers);

// find user by id
router.get("/getUserById/:id", clientUserController.getUserById);

// find user by email
router.get("/getUserByEmail/:email", clientUserController.getUserByEmail);

// add 1 user
router.post("/addUser", clientUserController.addUser);

// delete user by email
router.delete(
  "/deleteUserByEmail/:email",
  clientUserController.deleteUserByEmail
);

// delete user by id
router.delete("/deleteUserById/:id", clientUserController.deleteUserById);

// edit user by id
router.put("/editUserById/:id", clientUserController.editUserById);

// edit user by Email
router.put("/editUserByEmail/:email", clientUserController.editUserByEmail);

module.exports = router;
