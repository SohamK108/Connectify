import express from "express";
import { protectRoute } from "../Middlewares/auth.middleware.js";
import { getFriendsInformation,addFriend,getUsersForFriendRequest, getUserInformationByUserName } from "../Controllers/friend.controller.js";
const router=express.Router();

router.get("/getFriendsInformation",protectRoute,getFriendsInformation);
router.get("/getUsersForFriendRequest",protectRoute,getUsersForFriendRequest);
router.get("/getUserInformationByUserName/:userName",protectRoute,getUserInformationByUserName);
router.post('/addFriend',protectRoute,addFriend);
export default router;


