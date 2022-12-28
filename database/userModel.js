import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Users Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  exercises: [{
    type: Schema.Types.ObjectId,
    ref: "exercise"
  }],
  versionKey: false
});

export const user = mongoose.model("user", userSchema)
