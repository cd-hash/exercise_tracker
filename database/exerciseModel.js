import mongoose from "mongoose";

const Schema = mongoose.Schema;

const exerciseSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  username: {
    type: String
  },
  description: {
    type: String
  },
  duration: {
    type: Number
  },
  date: {
    type: Date
  },
  versionKey: false
});

export const exercise = mongoose.model("exercise", exerciseSchema)
