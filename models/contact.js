const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  text: String,
  author: String,
  email: String,
  tel: String,
  sent: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Contact", contactSchema);
