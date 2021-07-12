import mongoose from "mongoose";

const Schema = mongoose.Schema;

const opts = {
  // Make Mongoose use Unix time (seconds since Jan 1, 1970)
  timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
};

const CommentSchema = new Schema(
  {
    content: {
      type: String,
      require: true,
    },
    likeCount: {
      type: Number,
      default: 0,
    },
    username: {
      type: String,
      require: true,
    },
    replies: [{ type: Schema.Types.ObjectId, ref: "Reply" }],
    replyCount: {
      type: Number,
      default: 0,
    },
    photo: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

export const CommentModel = mongoose.model("Comment", CommentSchema);
