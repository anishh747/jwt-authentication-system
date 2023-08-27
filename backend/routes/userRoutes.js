import express from "express";
import {authUser,registerUser,logOutUser,getUserProfile,updateProfile} from "../controllers/userController.js";

const router = express.Router();

router.post('/auth',authUser);

router.post('/',registerUser);

router.post('/logout',logOutUser);

router.route('/profile').get(getUserProfile).put(updateProfile)

export default router;