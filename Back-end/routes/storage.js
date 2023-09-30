const express = require("express");
const router = express.Router();

router.get("/storage-page", (req, res, next) => {
  res.render("storage.ejs", { path: "/storage" });
});

module.exports = router;
