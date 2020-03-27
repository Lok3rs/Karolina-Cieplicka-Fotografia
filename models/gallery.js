const mongoose = require("mongoose");

// MONGOOSE/MODEL SCHEMA
const gallerySchema = new mongoose.Schema({
  title: String,
  img: String,
  desc: String,
  created: {
    type: Date,
    default: Date.now
  },
  fotos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Foto"
    }
  ]
});

module.exports = mongoose.model("Gallery", gallerySchema);
