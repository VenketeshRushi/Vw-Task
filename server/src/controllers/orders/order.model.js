const mongoose = require("mongoose");

const reqString = { type: String };
const reqNumber = { type: Number };
const reqArray = { type: Array };

const orderSchema = new mongoose.Schema(
  {
    ordersummry: {
      total: reqNumber,
      quantity: reqNumber,
    },
    cartItems: [
      {
        _id: reqString,
        title: reqString,
        gender: reqString,
        price: reqNumber,
        img: reqString,
        quantity: reqNumber,
      },
    ],
    shippingdata: {
      name: reqString,
      addressLine: reqString,
      locality: reqString,
      state: reqString,
      country: reqString,
      email: reqString,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const order = mongoose.model("ordertask", orderSchema);

module.exports = order;
