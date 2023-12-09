const ingredientController = require("../controllers/ingredient.controller");
const router = require("express").Router();

router.post("/addIngredient", ingredientController.addIngredient);
router.get("/getAllIngredient", ingredientController.getAllIngredients);
router.get("/getIngredient/:id", ingredientController.getIngredientById);
router.put("/updateIngredient/:id", ingredientController.updateIngredient);
router.delete("/deleteIngredient/:id", ingredientController.deleteIngredient);
router.put("/buyIngredient", ingredientController.buyIngredient);

module.exports = router;
