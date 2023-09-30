const express = require("express");
const router = express.Router();
const storageController = require("../controllers/storage.controller");

router.get("/storage-page", storageController.getStoragePage);

module.exports = router;
