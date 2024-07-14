import { Router } from "express";
import { getUserPosts, 
    addPost, 
    likeThePost, 
    unLikeThePost, 
    checkPostLikeStatus, postNewComment, getPostComments } from "../controller/Post.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/:userId", auth, getUserPosts);
router.post("/", auth, addPost);
router.post("/like", auth, likeThePost);
router.post("/unlike", auth, unLikeThePost);
router.post("/likedPost", auth, checkPostLikeStatus)
router.post("/comments/add", auth, postNewComment)
router.get("/comments/:postId", auth, getPostComments)


export default router;
