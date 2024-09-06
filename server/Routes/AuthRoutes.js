import express from "express";
import { LoginUser, SignupUser } from "../Controllers/AuthControllers.js";

export const AuthRouter = express.Router();

AuthRouter.post("/signup", SignupUser);
AuthRouter.post("/login", LoginUser);
