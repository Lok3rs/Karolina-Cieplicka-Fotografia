const express = require("express"),
  Gallery = require("../models/gallery"),
  router = express.Router(),
  middleware = require("../middleware");

//   INDEX ROUTE
router.get("/", (req, res) => {
  Gallery.find({}, (err, gallery) => {
    if (err) {
      console.log("ERROR : ${err.message}");
    } else {
      res.render("gallery/index", {
        gallery: gallery
      });
    }
  });
});

// NEW GALLERY ROUTES
router.get("/new", middleware.isLoggedIn, (req, res) => {
  res.render("gallery/new");
});

router.post("/", middleware.isLoggedIn, (req, res) => {
  req.body.gallery.body = req.sanitize(req.body.gallery.body);
  const title = req.body.gallery.title,
    img = req.body.gallery.img,
    desc = req.body.gallery.desc;
  const newGallery = {
    title: title,
    img: img,
    desc: desc
  };
  Gallery.create(newGallery, (err, newP) => {
    if (err) {
      req.flash("error", err.message);
      res.redirect("gallery/new");
    } else {
      req.flash("success", "Dodałaś nową galerię. Pora dodać do niej zdjęcia!");
      res.redirect("/gallery");
    }
  });
});

// GALLERY VIEW ROUTE
router.get("/:id", (req, res) => {
  Gallery.findById(req.params.id)
    .populate("fotos")
    .exec((err, gallery) => {
      if (err) {
        req.flash("error", "Nie znalazłem takiej galerii :(");
        res.redirect("/gallery");
      } else {
        res.render("gallery/detail", {
          gallery: gallery
        });
      }
    });
});

// GALLERY DELETE ROUTE
router.delete("/:id", middleware.isLoggedIn, (req, res) => {
  Gallery.findByIdAndDelete(req.params.id, (err, gallery) => {
    if (err) {
      req.flash("Coś poszło nie tak :-(!");
      res.redirect("/gallery");
    } else {
      req.flash("success", "Galeria usunięta!");
      res.redirect("/gallery");
    }
  });
});

// EDIT FORM VIEW
router.get("/:id/edit", middleware.isLoggedIn, (req, res) => {
  Gallery.findById(req.params.id, (err, gallery) => {
    if (err) {
      req.flash("Nie masz uprawnień do tego!");
      res.redirect("back");
    } else {
      res.render("gallery/edit", {
        gallery: gallery
      });
    }
  });
});

// EDIT VIEW
router.put("/:id", middleware.isLoggedIn, (req, res) => {
  Gallery.findByIdAndUpdate(req.params.id, req.body.gallery, (err, gallery) => {
    if (err) {
      req.flash("Coś poszło nie tak :-(!");
      res.redirect("back");
    } else {
      res.redirect(`/gallery/${gallery._id}`);
    }
  });
});

module.exports = router;
