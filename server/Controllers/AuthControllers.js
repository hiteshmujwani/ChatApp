import bcryptjs from "bcryptjs";
import { User } from "../Models/UserModel.js";
import jwt from "jsonwebtoken";

const generateToken = async (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

export const SignupUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      res.status(400).send("Email or Password is Required");
      return;
    }
    //check is user already exist
    const isAlreadyUserExist = await User.findOne({ email });
    if (isAlreadyUserExist) {
      res.status(200).send("This Email Is Already In Use");
      return;
    }

    //creating user
    const user = await User.create({ email, password });

    //sending cookies
    res.cookie("token", generateToken(user), {
      secure: true,
      sameSIte: "none",
    });

    //sending response of data
    res.status(201).json({ user: user });
  } catch (error) {
    console.log(error);
    res.status(500).send("internal server error (signup)");
  }
};

export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
      res.status(400).send("Email or Password is Required");
      return;
    }

    //check is user already exist
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).send("No account found with this email");
      return;
    }

    //match password with users encrypted password
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      res.status(401).send("Invalid Email Or Password");
      return;
    }

    //sending cookies
    res.cookie("token", generateToken(user), {
      secure: true,
      sameSIte: "none",
    });

    //sending response of data
    res.status(201).json({ user: user });
  } catch (error) {
    console.log(error);
    res.status(500).send("internal server error (Login)");
  }
};
