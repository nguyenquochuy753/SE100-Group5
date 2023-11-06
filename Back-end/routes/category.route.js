const categoryController = require("../controllers/category.controller");
const router = require("express").Router();

router.post("/addCategory", categoryController.addCategory);
router.get("/getAllCategories", categoryController.getAllCategories);

module.exports = router;
