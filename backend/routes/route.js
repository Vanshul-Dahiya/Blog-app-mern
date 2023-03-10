// this file contains all routes

import express from "express";
import { signupUser } from "../controller/user-controller.js";

const router = express.Router();

// signup route
router.post("/signup", signupUser);

export default router;
