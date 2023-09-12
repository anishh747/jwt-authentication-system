import express from "express";
import {createRoom, endRoom, joinRoom, inviteRoom} from "../controllers/roomController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/createroom',createRoom);

router.post('/inviteroom',inviteRoom);

router.get('/joinroom',protect,joinRoom);

router.post('/endroom',protect,endRoom);

export default router;