const mongoose = require("mongoose");

const reqString = { type: String, required: true };
const reqNumber = { type: Number, required: true };
const reqArray = { type: Array, required: true };

const allProductSchema = new mongoose.Schema({
  title: reqString,
  gender: reqString,
  price: reqNumber,
  img: reqString,
}, {
  versionKey: false
});

const allProduct = mongoose.model("allProduct", allProductSchema);

module.exports = allProduct;
