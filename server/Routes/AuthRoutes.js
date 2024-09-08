import express from "express";
import {
  getUserInfo,
  LoginUser,
  SignupUser,
} from "../Controllers/AuthControllers.js";
import { verifyToken } from "../Middlewares/AuthMiddleware.js";

const AuthRouter = express.Router();

AuthRouter.post("/signup", SignupUser);
AuthRouter.post("/login", LoginUser);
AuthRouter.get("/user-info", verifyToken, getUserInfo);

export default AuthRouter;
