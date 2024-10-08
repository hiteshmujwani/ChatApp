import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const UserShema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  profileImage: {
    type: String,
    required: false,
  },
  profileSetup: {
    type: Boolean,
    required: false,
    default: false,
  },
});

UserShema.pre("save", async function (next) {
  try {
    const salt = await bcryptjs.genSalt(10); // Generate a salt with 10 rounds
    const hashedPassword = await bcryptjs.hash(this.password, salt); // Hash the password
    this.password = hashedPassword; // Replace the plain password with hashed password
    next();
  } catch (error) {
    console.log(error, "Error in Hashing Password");
    return;
  }
});

export const User = mongoose.model("Users", UserShema);
