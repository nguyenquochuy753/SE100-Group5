const router = require("express").Router();
const mealController = require("../controllers/meal.controller");
const upload = require("../Middleware/Upload");

router.post(
  "/addMeal",
  upload.single("hinh_anh_mon_an"),
  mealController.addMeal
);
router.get("/getAllMeals", mealController.getAllMeals);
router.get("/getMeal/:id", mealController.getMeal);
router.put("/updateMeal/:id", mealController.updateMeal);
router.delete("/deleteMeal/:id", mealController.deleteMeal);

module.exports = router;
