import mongoose from "mongoose";

// Users Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  versionKey: false
});

export const user = mongoose.model("user", userSchema)
