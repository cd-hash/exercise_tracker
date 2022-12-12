import express from "express";
import { user } from "../database/userModel.js"

//create our user-router
const userRouter = express.Router();

// create a new user on /api/users
userRouter.post("/api/users", (_req, _res) => {
  
});

// Handle Genre create on POST.
module.exports(userRouter);