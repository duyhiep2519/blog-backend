import mongoose from "mongoose";

const Schema = mongoose.Schema;

const opts = {
  // Make Mongoose use Unix time (seconds since Jan 1, 1970)
  timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
};

const ReplySchema = new Schema(
  {
    content: {
      type: String,
      require: true,
    },
    likeCount: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
      require: true,
    },
    url: {
      type: String,
      require: true,
      default:
        "https://phunugioi.com/wp-content/uploads/2020/10/hinh-anh-avatar-de-thuong-cute.jpg",
    },
  },
  { timestamps: true }
);

export const ReplyModel = mongoose.model("Reply", ReplySchema);
