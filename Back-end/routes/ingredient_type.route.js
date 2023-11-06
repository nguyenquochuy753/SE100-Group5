const ingredientTypeController = require("../controllers/ingredient_type.controller");
const router = require("express").Router();

router.post('/addIngredientType', ingredientTypeController.addIngredient_type);
router.get('/getAllIngredientType', ingredientTypeController.getAllIngredientType);
router.put('/updateIngredientType/:id', ingredientTypeController.updateIngredientType);
router.delete('/deleteIngredientType/:id', ingredientTypeController.deleteIngredientType);

module.exports = router;