const reservingController = require("../controllers/Reseving.controller");
const router = require("express").Router();

router.post("/addReserving", reservingController.reserving);
router.get("/getAllReservings", reservingController.getAllRervings);
router.get("/getReservingById/:_id", reservingController.getRervingById);
router.put("/updateReservingById/:_id", reservingController.updateReserving);

module.exports = router;
