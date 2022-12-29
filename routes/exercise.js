import express from "express";
import { exercise } from "../database/exerciseModel.js"
import { user } from "../database/userModel.js"

// create routers
const createExerciseRoute = express.Router();
const getExerciseLogRoute = express.Router();

// create a new exercise for a user
const cleanDuration = (durationString) => parseInt(durationString, 10);

const cleanDate = (dateString) => {
  if (!dateString) {
    return new Date();
  }
  return new Date(dateString);
};

const createExercise = async (req, res) => {
  const { description, duration, date} = req.body;
  const userId = req.params._id;
  const foundUser = await user.findById(userId)
  if (!foundUser) {
    res.json({
      message: "No user exists for the ID given",
      id: userId
    });
  };
  const cleanedDuration = cleanDuration(duration);
  const cleanedDate = cleanDate(date);
  const newExercise = await exercise.create({
    username: foundUser.username,
    userId: userId,
    description: description,
    duration: cleanedDuration,
    date: cleanedDate
  });
  foundUser.exercises.push(newExercise._id)
  foundUser.save()
  res.send({
    username: foundUser.username,
    description: description,
    duration: cleanedDuration,
    _id: foundUser._id,
    date: cleanedDate.toDateString()
  });
};
createExerciseRoute.post("/api/users/:_id/exercises", createExercise);

// get
const createExerciseLog = userObject => {
  return {
    username: userObject.username,
    count: userObject.exercises.length,
    _id: userObject._id,
    log: userObject.exercises.map(exercise => {
      return {
        description: exercise.description,
        duration: exercise.duration,
        date: exercise.date.toDateString()
      };
    })
  };
};

const userExerciseLog = (req, res) => {
  const userId = req.params._id;
  let { from, to, limit } = req.query;
  limit = limit || 100;
  let exerciseFilters = {};
  let dateFilters = {};
  console.log({from, to, limit})
  if (from) {
    dateFilters["$gte"] = new Date(from)
  };
  if (to) {
    dateFilters["$lte"] = new Date(to)
  };
  if (from || to) {
    exerciseFilters.date = dateFilters;
  };
  user.
    findById(userId).
    populate({
      path: "exercises",
      match: exerciseFilters,
      options: {limit: limit}
    }).
    exec((err, user) => {
      if (err) {
        res.json({
          message: "No user exists with that userId",
          userID: userId
        });
      };
      const userLog = createExerciseLog(user)
      res.send(userLog)
    });
};

getExerciseLogRoute.get("/api/users/:_id/logs", userExerciseLog);


export {
  createExerciseRoute,
  getExerciseLogRoute
};