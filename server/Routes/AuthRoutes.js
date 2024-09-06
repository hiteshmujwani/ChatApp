import express from "express";
import { LoginUser, SignupUser } from "../Controllers/AuthControllers.js";

const AuthRouter = express.Router();

AuthRouter.post("/signup", SignupUser);
AuthRouter.post("/login", LoginUser);

export default AuthRouter;
