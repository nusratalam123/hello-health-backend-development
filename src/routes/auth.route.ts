import { Router } from "express";
import { loggedInUser, login, logout, signup } from "../controller/auth.controller";

const router = Router();

// register new user
router.post("/signup", signup);

// user login
router.post("/login", login);

// user logout
router.delete("/logout", logout);

// get logged in user
router.post("/user", loggedInUser);



export default router;
