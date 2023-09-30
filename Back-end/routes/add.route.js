const express = require("express");
const router = express.Router();
const addController = require("../controllers/add.controller");

router.get("/add-page", addController.getAddProduct);

router.post("/add-product", addController.postAddProduct);

module.exports = router;
