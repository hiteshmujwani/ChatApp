import bcryptjs from "bcryptjs";
import { User } from "../Models/UserModel.js";
import jwt from "jsonwebtoken";

const generateToken = async (user) => {
  return await jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET
  );
};

export const SignupUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      res.status(400).json({ msg: "Email or Password is Required" });
      return;
    }
    //check is user already exist
    const isAlreadyUserExist = await User.findOne({ email });
    if (isAlreadyUserExist) {
      res.status(200).json({ msg: "This email is already in use" });
      return;
    }

    //creating user
    const user = await User.create({ email, password });

    //sending cookies
    const token = await generateToken(user);
    res.cookie("token", token, {
      secure: true,
      sameSIte: "none",
    });

    //sending response of data
    res.status(201).json({ data: user, msg: "Account Created Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "internal server error (sign up)" });
  }
};

export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
      res.status(400).json({ msg: "Email or Password is Required" });
      return;
    }

    //check is user already exist
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ msg: "No account found with this email" });
      return;
    }

    //match password with users encrypted password
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      res.status(401).json({ msg: "invalid email or password" });
      return;
    }

    //sending cookies
    const token = await generateToken(user);
    res.cookie("token", token, {
      secure: true,
      sameSIte: "none",
    });

    //sending response of data
    res.status(200).json({ data: user, msg: "Login successfull" });
  } catch (error) {
    console.log(error);
    res.status(500).send("internal server error (Login)");
  }
};

export const getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({
      data: user,
    });
  } catch (error) {
    console.log("Error in getUserInfo:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

// some validations remaining
export const updateProfile = async (req,res) =>{
  try {
    const {userId} = req;
    const user = await User.findByIdAndUpdate(userId,{...req.body},{new:true})
    res.status(200).json({
      success:true,
      msg:"Profile Updated Successfully",
      data:user
    })
  } catch (error) {
    console.log("Error in updating Profile",error)
    res.status(500).json({msg:"Internal Server Error !"})
  }
}

// some validations remaining
export const userLogout = async(req,res) =>{
  try {
    res.clearCookie("token"); // deleting cookies from device for logout
    res.status(200).json({
      msg:"Logout Successfull",
      success:true
    })
  } catch (error) {
    console.log("Error in user logout ",error)
    res.status(500).json({msg:"Internal Server Error !"})
  }
}