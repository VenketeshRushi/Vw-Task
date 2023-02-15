const mongoose = require("mongoose");

const connect = () => {
  mongoose.set("strictQuery", false);
  return mongoose.connect(
    "mongodb+srv://raman:ramanrushi@cluster0.zc3515e.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  );
};

module.exports = connect;
