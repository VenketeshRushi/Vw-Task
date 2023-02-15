const express = require("express");
const jwt = require("jsonwebtoken");

const UserModel = require("./user.model");

const app = express.Router();

app.post("/signup", async (req, res) => {
  let { email, password, name } = req.body;
  try {
    console.log(email, password);
    let user = await UserModel.findOne({ email: email });
    if (user) {
      return res.send({
        status: "Failed",
        message: "Please try with different email",
      });
    }

    const emailAdmin = email.split("@")[1];
    console.log(emailAdmin)
    if (emailAdmin === "admin.com") {
      user = await UserModel.create({
        email: email,
        password: password,
        name: name,
        role: "admin",
      });
      return res
        .status(201)
        .send({ message: "Signed in successfully", role: "admin" });
    } else {
      user = await UserModel.create({
        email: email,
        password: password,
        name: name,
        role: "user",
      });
      return res
        .status(201)
        .send({ message: "Signed in successfully", role: "user" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(201).json({ message: error.message, status: "Failed" });
  }
});

app.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await UserModel.findOne({ email });

    if (!user) {
      return res
        .status(500)
        .send({ status: "Failed", message: "Please check your email" });
    }

    const matchpassword = user.password === password;

    if (!matchpassword) {
      return res
        .status(500)
        .send({ status: "Failed", message: "Please check your password" });
    }

    const token = jwt.sign({ user }, "1234", { expiresIn: "1 hr" });

    return res.status(201).send({
      jwttoken: token,
      userid: user._id,
      role: user.role,
      username: user.name,
      message: "Login Successfully",
    });
  } catch (error) {
    res.status(201).send(error.message);
  }
});

module.exports = app;
