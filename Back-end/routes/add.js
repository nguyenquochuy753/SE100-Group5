const express = require("express");
const router = express.Router();

router.get("/add-page", (req, res, next) => {
  res.render("add-page", { path: "/add-page" });
});

module.exports = router;
