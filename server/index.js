import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import AuthRouter from "./Routes/AuthRoutes.js";
import ContactRouter from "./Routes/ContactsRoute.js";
import SocketSetup from "./Socket.js";
import ChatRouter from "./Routes/ChatRoute.js";

// configuring dot env
dotenv.config();

//setup
const app = express();
const port = process.env.PORT;

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
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
//contact Route
app.use("/api/v1/contact", ContactRouter);
//Chat Route
app.use("/api/v1/chat", ChatRouter);

//listning to server
const server = app.listen(port, () => {
  console.log(`SERVER RUNNING ON ${port}`);
});

//passing server to socket
SocketSetup(server);
