import mongoose from "mongoose";

const Schema = mongoose.Schema;

const exerciseSchema = new mongoose.Schema({
  username: { type: Schema.Types.ObjectId, ref: "user", required: true },
  description: { type: String },
  duration: { type: Number},
  date: {type: Date}
  
});

export const exercise = mongoose.model("exercise", exerciseSchema)
