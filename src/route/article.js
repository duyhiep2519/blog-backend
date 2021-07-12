import express from "express";
import {
  getArticle,
  createArticle,
  updateArticle,
  getOneArticle,
  postComment,
  getComments,
  postReply,
  getReply,
  likeCount,
  likeCountComment,
  likeCountReply,
  searchArticle,
} from "../controller/article.js";

const router = express.Router();

router.get("/", getArticle);
router.post("/", createArticle);
router.get("/search/:query", searchArticle);
router.post("update", updateArticle);
router.post("/:id/comment", postComment);
router.get("/:id/comment", getComments);
router.post("/:id/reply", postReply);
router.get("/:id/reply", getReply);
router.post("/:id/likecount", likeCount);
router.post("/:id/likecountcomment", likeCountComment);
router.post("/:id/likecountreply", likeCountReply);
router.get("/:slug", getOneArticle);

export default router;
