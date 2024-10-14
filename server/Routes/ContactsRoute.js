import express from "express";
import { getContactsForDMList, searchContact } from "../Controllers/ContactsController.js";
import { verifyToken } from "../Middlewares/AuthMiddleware.js";

const ContactRouter = express.Router();

ContactRouter.post("/search",verifyToken, searchContact);
ContactRouter.get("/get-dm-contact-list",verifyToken, getContactsForDMList);


export default ContactRouter;
