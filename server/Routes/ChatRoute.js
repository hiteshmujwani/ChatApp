import express from "express";

import { verifyToken } from "../Middlewares/AuthMiddleware.js";
import { getMessages } from "../Controllers/ChatController.js";

const ChatRouter = express.Router();

ChatRouter.post("/get-messages",verifyToken, getMessages);

export default ChatRouter;
