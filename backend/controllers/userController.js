import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import mongoose from "mongoose";
import generateToken from "../utils/generateToken.js";

const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id, 
      username: user.username
    });
  } else {
    res.status(401);
    throw new Error("Invalid username or password");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { username, password, email } = req.body;


  const userExist = await User.findOne({ username, email });

  if (userExist) {
    res.status(400);
    throw new Error("User exist");
  }

  const user = await User.create({
    username,
    email,
    password,
  });


  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      username: user.username,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});


export {
  authUser,
  registerUser,
};
