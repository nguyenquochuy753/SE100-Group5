const router = require("express").Router();
const placeOrderController = require("../controllers/placeOrder.controller");

router.post('/addPlaceOrder', placeOrderController.addPlaceOrder);
router.get('/getAllPlaceOrders',placeOrderController.getAllPlaceOrder)

module.exports = router;