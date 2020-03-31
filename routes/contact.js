const express = require("express"),
  router = express.Router(),
  Contact = require("../models/contact"),
  middleware = require("../middleware");

// CONTACT FORM PAGE
router.get("/", (req, res) => {
  res.render("contact/form");
});

router.post("/", (req, res) => {
  req.body.contact.body = req.sanitize(req.body.contact.body);
  const author = req.body.contact.author,
    text = req.body.contact.text,
    email = req.body.contact.email,
    tel = req.body.contact.tel;
  const newContact = {
    text: text,
    email: email,
    tel: tel,
    author: author
  };
  Contact.create(newContact, (err, newC) => {
    if (err) {
      req.flash("error", "Coś poszło nie tak!");
      res.render("back");
    } else {
      req.flash("success", "Dzięki za kontakt! Odpowiem jak najszybciej!");
      res.redirect(req.get("referer"));
    }
  });
});

// INBOX PAGE ROUTES
router.get("/inbox", middleware.isLoggedIn, (req, res) => {
  Contact.find({}, (err, contact) => {
    if (err) {
      console.log("ERROR : ${err.message}");
    } else {
      res.render("contact/list", {
        contact: contact
      });
    }
  });
});

// MESSAGE DETAIL ROUTE
router.get("/inbox/:id", middleware.isLoggedIn, (req, res) => {
  Contact.findById(req.params.id).exec((err, contact) => {
    if (err) {
      req.flash("error", "Coś poszło nie tak! :(");
      res.redirect("/contact/inbox");
    } else {
      res.render("contact/detail", {
        contact: contact
      });
    }
  });
});

// DELETE MESSAGE ROUTE
router.delete("/inbox/:id", middleware.isLoggedIn, (req, res) => {
  Contact.findByIdAndDelete(req.params.id, (err, contact) => {
    if (err) {
      req.flash("Coś poszło nie tak :-(!");
      res.redirect("/contact/inbox");
    } else {
      req.flash("success", "Wiadomość usunięta.");
      res.redirect("/contact/inbox");
    }
  });
});

module.exports = router;
