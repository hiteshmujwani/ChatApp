import express from "express";
import { searchContact } from "../Controllers/ContactsController.js";

const ContactRouter = express.Router();

ContactRouter.post("/search", searchContact);

export default ContactRouter;
