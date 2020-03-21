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

// NEW POST ROUTES
router.get("/new", middleware.isLoggedIn, (req, res) => {
  res.render("blog/new");
});

router.post("/", middleware.isLoggedIn, (req, res) => {
  req.body.blog.body = req.sanitize(req.body.blog.body);
  const title = req.body.blog.title,
    img = req.body.blog.img,
    content = req.body.blog.content,
    author = {
      id: req.user._id,
      username: req.user.username
    };
  const newPost = {
    title: title,
    img: img,
    content: content,
    author: author
  };
  Blog.create(newPost, (err, newP) => {
    if (err) {
      req.flash("error", err.message);
      res.render("blog/new");
    } else {
      req.flash("success", "Dodałaś post!");
      res.redirect("/blog");
    }
  });
});

module.exports = router;
