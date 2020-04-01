const express = require("express"),
  router = express.Router(),
  passport = require("passport"),
  User = require("../models/user");

// LANDING PAGE ROUTE
router.get("/", function(req, res) {
  res.render("landing");
});

// WELCOME PAGE ROUTE
router.get("/welcome", (req, res) => {
  res.render("welcome");
});

// REGISTER/LOGIN ROUTES
router.get("/secretregister", (req, res) => res.render("auth/register"));

router.post("/secretregister", (req, res) => {
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
        req.flash("success", `Zarejestrowano! Witaj ${user.username}!`);
        res.redirect("/blog");
      });
    }
  );
});
router.get("/login", (req, res) => res.render("auth/login"));

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/welcome",
    failureRedirect: "/login",
    failureFlash: true
  }),
  (req, res) => {
    req.flash("success", `Witaj ponownie ${user.username}`);
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "Wylogowano, miłego dnia!");
  res.redirect(req.get("referer"));
});

module.exports = router;
