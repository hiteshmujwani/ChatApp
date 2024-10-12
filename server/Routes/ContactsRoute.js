import express from "express";
import { searchContact } from "../Controllers/ContactsController.js";
import { verifyToken } from "../Middlewares/AuthMiddleware.js";

const ContactRouter = express.Router();

ContactRouter.post("/search",verifyToken, searchContact);

export default ContactRouter;
