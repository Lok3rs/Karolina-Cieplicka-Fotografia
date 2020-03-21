const express = require("express"),
  Blog = require("../models/blog"),
  router = express.Router(),
  middleware = require("../middleware");

//  INDEX ROUTE
router.get("/", (req, res) => {
  Blog.find({}, (err, blog) => {
    if (err) {
      console.log("ERROR : ${err.message}");
    } else {
      res.render("blog/index", {
        blog: blog
      });
    }
  });
});

module.exports = router;
