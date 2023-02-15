const express = require("express");

const allProduct = require("./allProduct.model");

const app = express.Router();

app.get("/", async (req, res) => {
  try {
    let products = await allProduct.find();
    return res.send(products);
  } catch (error) {
    return res.status(404);
  }
});

app.get("/single/:id", async (req, res) => {
  let id = req.params.id.split("::")[1];

  try {
    let products = await allProduct.findOne({ _id: id });
    console.log(products);
    return res.send(products);
  } catch (error) {
    return res.status(404);
  }
});

app.patch("/update/:id", async (req, res) => {
  console.log("hit");
  let id = req.params.id.split("::")[1];
  let data = req.body;
  console.log(id, data);
  try {
    let filter = { _id: id };
    let update = data;
    let product = await allProduct.findOneAndUpdate(filter, update);
    console.log(product);
    return res.send(product);
  } catch (error) {
    return res.send(error.message);
  }
});

app.delete("/delete/:id", async (req, res) => {
  let id = req.params.id.split(":")[1];
  console.log("id delete",id)
  try {
    let product = await allProduct.findByIdAndDelete({ _id: id });
    return res.send(product);
  } catch (error) {
    return res.send(error.message);
  }
});

app.post("/add", async (req, res) => {
  console.log("i am in ", req.body);

  try {
    let data = {
      title: req.body.title,
      gender: req.body.gender,
      price: +req.body.price,
      img: req.body.img,
    };
    let product = await allProduct.create(data);
    return res.send(product);
  } catch (error) {
    return res.send(error.message);
  }
});

module.exports = app;
