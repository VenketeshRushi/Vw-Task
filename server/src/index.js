const express = require("express");
const cors = require("cors");
const PORT = 8080;
const dbconnect = require("./config/db");

const productRouter = require("./controllers/allproduct/allproduct.router");
const orderRouter = require("./controllers/orders/order.router");
const userRouter = require("./controllers/user/user.router");
const paymentController = require('./controllers/payment.controller');

const app = express();

app.use(cors());
app.use(express.json());

app.use("/allproducts", productRouter);
app.use("/order", orderRouter);
app.use("/user", userRouter);

//Razorpay payment
app.use("/api/payment", paymentController);

app.listen(PORT, async () => {
  try {
    await dbconnect();
    console.log(`listening on http://localhost:${PORT}`);
  } catch (error) {
    console.log(error.message);
  }
});
