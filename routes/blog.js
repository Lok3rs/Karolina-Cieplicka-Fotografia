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

// ARCHIVE ROUTE
router.get("/archive", (req, res) => {
  Blog.find({}, (err, blog) => {
    if (err) {
      console.log("ERROR : ${err.message}");
    } else {
      res.render("blog/archive", {
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
    galleryUrl = req.body.blog.galleryUrl;
  author = {
    id: req.user._id,
    username: req.user.username
  };
  const newPost = {
    title,
    img,
    galleryUrl,
    content,
    author
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

// DETAIL ROUTE
router.get("/:id", (req, res) => {
  Blog.findById(req.params.id)
    .populate("comments")
    .exec((err, blog) => {
      if (err) {
        req.flash("error", "Nie znalazłem takiego posta.:(");
        res.redirect("/");
      } else {
        res.render("blog/show", {
          blog: blog
        });
      }
    });
});

// EDIT FORM VIEW
router.get("/:id/edit", middleware.isLoggedIn, (req, res) => {
  Blog.findById(req.params.id, (err, blog) => {
    if (err) {
      req.flash("Nie masz uprawnień do tego!");
      res.redirect("back");
    } else {
      res.render("blog/edit", {
        blog: blog
      });
    }
  });
});

// EDIT VIEW ROUTE
router.put("/:id", middleware.isLoggedIn, (req, res) => {
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, blog) => {
    if (err) {
      req.flash("Coś poszło nie tak :-(!");
      res.redirect("back");
    } else {
      res.redirect(`/blog/${blog._id}`);
    }
  });
});

// DELETE VIEW ROUTe
router.delete("/:id", middleware.isLoggedIn, (req, res) => {
  Blog.findByIdAndDelete(req.params.id, (err, blog) => {
    if (err) {
      req.flash("Coś poszło nie tak :-(!");
      res.redirect("/blog");
    } else {
      req.flash("success", "Post usunięty!");
      res.redirect("/blog");
    }
  });
});

module.exports = router;
