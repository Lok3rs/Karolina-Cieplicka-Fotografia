const middlewareObj = {
  isLoggedIn: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error", "Musisz być zalogowana!");
    res.redirect("/login");
  }
};

module.exports = middlewareObj;
