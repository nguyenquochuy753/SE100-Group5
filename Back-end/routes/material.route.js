const materialController = require("../controllers/material.controller");
const router = require("express").Router();

router.post('/addMaterial',materialController.addMaterial)

module.exports = router