const express = require("express"),
  router = express.Router({
    mergeParams: true
  }),
  Blog = require("../models/blog"),
  Comment = require("../models/comment"),
  middleware = require("../middleware");

//  NEW COMMENT ROUTES
router.get("/new", (req, res) => {
  Blog.findById(req.params.id, (err, blog) => {
    if (err) {
      req.flash("error", "Coś poszło nie tak!");
    } else {
      res.render("comments/new", {
        blog: blog
      });
    }
  });
});

router.post("/", (req, res) => {
  Blog.findById(req.params.id, (err, blog) => {
    if (err) {
      req.flash("error", "Coś poszło nie tak!");
      res.redirect("back");
    } else {
      Comment.create(req.body.comment, (err, comment) => {
        if (err) {
          req.flash("error", "Coś poszło nie tak!");
        } else {
          blog.comments.push(comment);
          blog.save();
          res.redirect(`/blog/${blog._id}`);
        }
      });
    }
  });
});

// COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.isLoggedIn, (req, res) => {
  Comment.findByIdAndRemove(req.params.comment_id, err => {
    if (err) {
      req.flash("error", "Nie udało się usunąć komentarza");
      res.redirect("back");
    } else {
      req.flash("success", "Dobrze Karola, jebać hejterów!");
      res.redirect(`/blog/${req.params.id}`);
    }
  });
});

module.exports = router;
