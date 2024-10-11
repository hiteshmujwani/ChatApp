import express from "express";
import {
  getUserInfo,
  LoginUser,
  SignupUser,
  updateProfile,
  userLogout,
} from "../Controllers/AuthControllers.js";
import { verifyToken } from "../Middlewares/AuthMiddleware.js";

const AuthRouter = express.Router();

AuthRouter.post("/signup", SignupUser);
AuthRouter.post("/login", LoginUser);
AuthRouter.get("/user-info", verifyToken, getUserInfo);
AuthRouter.post("/update-profile", verifyToken, updateProfile);
AuthRouter.post("/user-logout", verifyToken, userLogout);

export default AuthRouter;
