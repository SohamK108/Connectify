import express from "express";
import { protectRoute } from "../Middlewares/auth.middleware.js";
import { 
  getMessages, 
  sendMessage, 
} from "../Controllers/message.controller.js";

const router = express.Router();


// Get messages with a specific user
router.get('/:id', protectRoute, getMessages);

// Send a message to a specific user
router.post('/send/:id', protectRoute, sendMessage);

export default router;
