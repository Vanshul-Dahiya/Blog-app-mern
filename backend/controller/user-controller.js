// this file has all user api

import User from "../model/user.js";
import bcrypt from "bcrypt";

export const signupUser = async (req, res) => {
  try {
    // const salt = await bcrypt.genSalt();
    // 10 is salt
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // get user details from frontend and validate them
    const user = {
      username: req.body.username,
      name: req.body.name,
      password: hashedPassword,
    };

    if (!user.username || !user.name || !user.password) {
      return res.status(400).json({ message:'invalid parameter' });
    }

    // newUser is a validated object
    const newUser = new User(user);

    // store values in database
    await newUser.save();

    return res.status(200).json({ msg: "sign up" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "error while signing up user" });
  }
};
