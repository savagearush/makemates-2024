import { Router } from "express";
import {
  checkFollowed,
  getUserProfile,
  searchUser,
} from "../controller/Search.js";
import auth from "../middleware/auth.js";

const router = Router();

router.post("/profile", auth, getUserProfile);
router.post("/user", auth, searchUser);
router.post("/checkFollowed", auth, checkFollowed);

export default router;
