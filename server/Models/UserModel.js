import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const UserShema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
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

export const User = mongoose.model("User", UserShema);
