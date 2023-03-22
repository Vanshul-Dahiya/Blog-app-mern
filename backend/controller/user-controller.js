// this file has all user api

import User from "../model/user.js";
import Token from "../model/token.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

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
      return res.status(400).json({ message: "invalid parameter" });
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

export const loginUser = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.status(400).json({ msg: "Username doesn't match" });
  }
  // if username matches , check password by decrypting
  try {
    let match = await bcrypt.compare(req.body.password, user.password);
    if (match) {
      const accessToken = jwt.sign(
        user.toJSON(),
        process.env.ACCESS_SECRET_KEY,
        { expiresIn: "15m" }
      );
      const refreshToken = jwt.sign(
        user.toJSON(),
        process.env.REFRESH_SECRET_KEY
      );

      // accessToken will expire , store refreshToken
      const newToken = new Token({ token: refreshToken });
      await newToken.save();

      return res.status(200).json({
        accessToken: accessToken,
        refreshToken: refreshToken,
        name: user.name,
        username: user.username,
      });
    } else {
      return res.status(400).json({ msg: "Password doesn't match" });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Error while login in user" });
  }
};
