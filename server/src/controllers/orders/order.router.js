const express = require("express");

const order = require("./order.model");

const app = express.Router();

app.post("/", async (req, res) => {
  let info = req.body;
  try {
    const data = await order.create({...info});
    return res.status(201).send(data);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

app.get("/", async (req, res) => {
  try {
    const data = await order.find();
    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
});

module.exports = app;
