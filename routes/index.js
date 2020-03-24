const express = require("express"),
  router = express.Router(),
  passport = require("passport"),
  User = require("../models/user");

//root route
router.get("/", function(req, res) {
  res.render("landing");
});
// welcome page route
router.get("/welcome", (req, res) => {
  res.render("welcome");
});
// =======================
// AUTH/LOGIN ROUTES
// =======================
router.get("/register", (req, res) => res.render("auth/register"));

router.post("/register", (req, res) => {
  User.register(
    new User({
      username: req.body.username,
      email: req.body.email
    }),
    req.body.password,
    (err, user) => {
      if (err) {
        req.flash("error", err.message);
        res.redirect("/register");
      }
      passport.authenticate("local")(req, res, () => {
        req.flash(
          "success",
          `Succesfully registrated! Welcome ${user.username}!`
        );
        res.redirect("/blog");
      });
    }
  );
});
router.get("/login", (req, res) => res.render("auth/login"));

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/blog",
    failureRedirect: "/login",
    failureFlash: true
  }),
  (req, res) => {
    console.log(`${currentUser.username} logged in`);
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "Logged out! See you again!");
  res.redirect("/blog");
});

module.exports = router;
