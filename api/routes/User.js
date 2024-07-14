import { Router } from "express";
import {
  login,
  register,
  getUserData,
  updateUserInfo,
  followUser,
  unfollowUser,
  getFriendList,
  setProfilePic,
  logoutUser,
} from "../controller/User.js";
import auth from "../middleware/auth.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", auth, logoutUser);

router.post("/update", auth, updateUserInfo);
router.post("/follow", auth, followUser);
router.post("/unfollow", auth, unfollowUser);
router.get("/friendList", auth, getFriendList);
router.post("/setProfilePic", auth, setProfilePic);
router.get("/me", auth, getUserData);

export default router;
