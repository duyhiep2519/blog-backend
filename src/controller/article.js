import { ArticleModel } from "../model/article.js";
import { CommentModel } from "../model/comment.js";
import { ReplyModel } from "../model/reply.js";

export const getArticle = async (req, res) => {
  try {
    const articles = await ArticleModel.find();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const searchArticle = async (req, res) => {
  const query = req.params.query;
  const regex = new RegExp(query, "i"); // include uppercase
  try {
    const articles = await ArticleModel.find({
      $or: [
        { author: { $regex: regex } },
        { title: { $regex: regex } },
        { content: { $regex: regex } },
      ],
    });
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getOneArticle = async (req, res) => {
  const slug = req.params.slug;

  try {
    const article = await ArticleModel.findOne({ slug: slug });

    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createArticle = async (req, res) => {
  try {
    const newArticle = req.body;
    const article = new ArticleModel(newArticle);
    await article.save();
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateArticle = async (req, res) => {
  try {
    const updateArticle = req.body;
    const article = await ArticleModel.findOneAndUpdate(
      { _id: updateArticle._id },
      updateArticle,
      { new: true, upsert: true, timestamps: false }
    );

    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// post comment
export const postComment = async (req, res) => {
  try {
    const content = req.body;
    const comment = new CommentModel(content);
    await comment.save();
    const article = await ArticleModel.findById(req.params.id);
    await article.comments.unshift(comment);
    await article.commentCount++;
    await article.save();
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//get comment
export const getComments = async (req, res) => {
  try {
    const _id = req.params.id;

    const comment = await ArticleModel.findById(_id)
      .lean()
      .populate("comments");
    res.status(200).json(comment.comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// post reply
export const postReply = async (req, res) => {
  try {
    const content = req.body;

    const reply = new ReplyModel(content);

    const _comment = await CommentModel.findById(req.params.id);
    await _comment.replies.unshift(reply);
    await _comment.replyCount++;

    const _article = await ArticleModel.findOne({ comments: req.params.id });
    await _article.commentCount++;

    await reply.save();
    await _comment.save();
    await _article.save();
    res.status(200).json(reply);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//get reply
export const getReply = async (req, res) => {
  try {
    const _id = req.params.id;

    const comment = await CommentModel.findById(_id).lean().populate("replies");
    res.status(200).json(comment.replies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//like counter article

export const likeCount = async (req, res) => {
  try {
    const _id = req.params.id;
    const article = await ArticleModel.findById(_id);
    await article.likeCount++;
    await article.save();

    res.status(200).json(article.likeCount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//like comment
export const likeCountComment = async (req, res) => {
  try {
    const _id = req.params.id;
    const comment = await CommentModel.findById(_id);
    await comment.likeCount++;
    await comment.save();

    res.status(200).json(comment.likeCount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//like reply

export const likeCountReply = async (req, res) => {
  try {
    const _id = req.params.id;
    const reply = await ReplyModel.findById(_id);
    await reply.likeCount++;
    await reply.save();

    res.status(200).json(reply.likeCount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
