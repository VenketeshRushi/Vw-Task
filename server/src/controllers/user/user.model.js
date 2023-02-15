const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, enum: ["user", "admin"], default: "user" },
});
const UserModel = model("UserSchemavowel", UserSchema);

module.exports = UserModel;
