import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import AuthRouter from "./Routes/AuthRoutes.js";
dotenv.config();
const app = express();
const port = process.env.PORT;

// Middlewares
app.use(
  cors({
    origin: "*",
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Database Configuraton
mongoose
  .connect(process.env.MONGO_URL)
  .then((connection) => console.log(connection.connection.host))
  .catch((error) => console.log(error));

// Routes

//Test Route
app.get("/", async (req, res) => {
  res.status(200).send("Yaha kya dekhne aaya hai bhai");
});

//Auth Routes
app.use("/api/v1/auth", AuthRouter);

const server = app.listen(port, () => {
  console.log(`SERVER RUNNING ON ${port}`);
});
