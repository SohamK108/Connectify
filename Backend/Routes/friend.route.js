import express from "express";
import { protectRoute } from "../Middlewares/auth.middleware.js";
import { getFriendsInformation,acceptRequest,getUsersForFriendRequest,getUserById, getUserInformationByUserName, sendFriendRequest,declineFriendRequest } from "../Controllers/friend.controller.js";
const router=express.Router();

router.get("/getFriendsInformation",protectRoute,getFriendsInformation);
router.get("/getUsersForFriendRequest",protectRoute,getUsersForFriendRequest);
router.get("/getUserInformationByUserName/:userName",protectRoute,getUserInformationByUserName);
router.get("/getUserById/:userId",protectRoute,getUserById);
router.put('/acceptRequest',protectRoute,acceptRequest);
router.put('/declineFriendRequest',protectRoute,declineFriendRequest);
router.put("/sendFriendRequest",protectRoute,sendFriendRequest);

export default router;


