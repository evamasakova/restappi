const mongoose = require("mongoose");

const petSchema = mongoose.Schema({
  name: { type: String, required: true },
  year: { type: Number, required: true },
  breed: { type: String, required: true },
  color: { type: String, required: true },
});

module.exports = mongoose.model("Pet", petSchema);