import express from "express";
import { user } from "../database/userModel.js"

//create our user-router
const userCreateRouter = express.Router();

// create a new user on /api/users
userCreateRouter.post("/api/users", async (req, res) => {
  const username = req.body.username;
  // create the new user
  const newUser = await user.create({
    username
  });
  res.json(newUser)
});

// handle user creation on post
export {
  userCreateRouter
};