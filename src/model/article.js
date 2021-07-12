import mongoose from "mongoose";
import slug from "mongoose-slug-generator";

mongoose.plugin(slug);
const Schema = mongoose.Schema;

const ArticleSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    imgUrl: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
    author: {
      type: String,

      default: "Duy Hiep Tran",
    },

    likeCount: {
      type: Number,
      default: 0,
    },
    slug: {
      type: String,
      slug: "title",
      unique: true,
    },
    intro: {
      type: String,
    },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    commentCount: {
      type: Number,
      default: 0,
    },
    privacy: {
      type: String,
      default: "Public",
    },
  },
  { timestamps: true }
);

export const ArticleModel = mongoose.model("Article", ArticleSchema);
