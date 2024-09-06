import { User } from "../Models/UserModel.js";

export const SignupUser = async (req, res) => {
  const { email, password } = req.body;
  const NewUser = await User.create({ email, password });
  res.send({ user: NewUser });
};

export const LoginUser = async (req, res) => {
  const { email, password } = req.body;
  const ExistUser = await User.findOne({ email });
  res.send({ user: ExistUser, msg: "Login Successfull" });
};
