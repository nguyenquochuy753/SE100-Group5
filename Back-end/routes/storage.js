const express = require("express");
const router = express.Router();

router.get("/storage", (req, res, next) => {
  res.send("<h1>Hello storage</h1>");
});

module.exports = router;
