import express from "express";
import { protectRoute } from "../Middlewares/auth.middleware.js";
import { getFriendsInformation,addFriend } from "../Controllers/friend.controller.js";
const router=express.Router();

router.get("/getFriendsInformation",protectRoute,getFriendsInformation);
router.post('/addFriend',protectRoute,addFriend);
export default router;


