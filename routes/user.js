import express from "express";

//create our user-router
const userRouter = express.Router();

// create a new user on /api/users
userRouter.post("/api/users", (_req, _res) => {
  // get the username and create a new User in the db
});

module.exports(userRouter);