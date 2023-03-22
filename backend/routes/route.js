// this file contains all routes

import express from "express";
import { signupUser, loginUser } from "../controller/user-controller.js";

const router = express.Router();

// signup route
router.post("/signup", signupUser);
// login route
router.post("/login", loginUser);

export default router;
