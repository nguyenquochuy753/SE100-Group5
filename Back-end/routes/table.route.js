const tableController = require("../controllers/table.controller");
const router = require("express").Router();

router.post("/addTable", tableController.addTable);
router.get("/getAllTables", tableController.getAllTables);
router.get("/getTable/:id", tableController.getTableById);
router.delete("/deleteTable/:id", tableController.deleteTable);
router.put("/updateTable/:id", tableController.updateTable);
router.put("/orderTable/:id", tableController.orderMeal);
router.get("/getTableNotAvailable", tableController.getTableNotAvailable);
router.put("/finishTheDish/:tableId/:itemId",tableController.finishTheDish);

module.exports = router;
