import express from "express";
import { checkAuth, login, logout, signup, updateProfile, updateProfileByUpload } from "../Controllers/auth.controller.js";
import { protectRoute } from "../Middlewares/auth.middleware.js";
const router=express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout",logout);
router.put("/updateProfileByUpload",protectRoute,updateProfileByUpload);
router.put("/updateProfile",protectRoute,updateProfile);
router.get("/checkAuth",protectRoute,checkAuth);
export default router;


