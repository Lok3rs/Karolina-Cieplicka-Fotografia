const express = require("express"),
  Gallery = require("../models/gallery"),
  Foto = require("../models/fotos"),
  router = express.Router({
    mergeParams: true
  }),
  middleware = require("../middleware");

// NEW FOTO ROUTES
router.get("/new", middleware.isLoggedIn, (req, res) => {
  Gallery.findById(req.params.id, (err, gallery) => {
    if (err) {
      req.flash("error", "Coś poszło nie tak!");
    } else {
      res.render("foto/new", {
        gallery: gallery
      });
    }
  });
});
router.post("/", (req, res) => {
  Gallery.findById(req.params.id, (err, gallery) => {
    if (err) {
      req.flash("error", "Coś poszło nie tak!");
      res.redirect("back");
    } else {
      Foto.create(req.body.foto, (err, foto) => {
        if (err) {
          req.flash("error", "Coś poszło nie tak!");
          res.redirect("back");
        } else {
          gallery.fotos.push(foto);
          gallery.save();
          req.flash("success", "Dodałaś zdjęcie!");
          res.redirect(`/gallery/${gallery._id}`);
        }
      });
    }
  });
});

// COMMENT DESTROY ROUTE
router.delete("/:foto_id", middleware.isLoggedIn, (req, res) => {
  Foto.findByIdAndRemove(req.params.foto_id, err => {
    if (err) {
      req.flash("error", "Nie udało się usunąć zdjęcia");
      res.redirect("back");
    } else {
      req.flash("success", "Zdjęcie usunięte");
      res.redirect(`/gallery/${req.params.id}`);
    }
  });
});

module.exports = router;
