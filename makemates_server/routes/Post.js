import { Router } from "express";
import { getUserPosts, addPost } from "../controller/Post.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/", auth, getUserPosts);
router.post("/", auth, addPost);

export default router;
