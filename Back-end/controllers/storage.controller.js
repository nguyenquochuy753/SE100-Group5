exports.getStoragePage = (req, res, next) => {
  res.render("storage", {
    path: "/storage",
  });
};
