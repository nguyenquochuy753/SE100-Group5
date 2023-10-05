const tableController = require("../controllers/table.controller")
const router = require('express').Router()

router.post('/addTable',tableController.addTable);
router.get('/getAllTables',tableController.getAllTables);
router.delete('/deleteTable/:id',tableController.deleteTable);
router.put('/updateTable/:id',tableController.updateTable);

module.exports = router