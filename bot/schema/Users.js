const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    displayName: {
      type: String,
    },
    wallet: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

// Force model to use 'users' collection explicitly
module.exports = mongoose.model("User", userSchema, "users");
