const express = require("express"),
  router = express.Router(),
  passport = require("passport"),
  User = require("../models/user");

//root route
router.get("/", function(req, res) {
  res.render("landing");
});

module.exports = router;
