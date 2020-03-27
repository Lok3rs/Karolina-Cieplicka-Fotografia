const mongoose = require("mongoose");

const fotoSchema = new mongoose.Schema({
  url: String
});

module.exports = mongoose.model("Foto", fotoSchema);
