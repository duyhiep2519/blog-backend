import { UserModel } from "../model/user.js";
import { ArticleModel } from "../model/article.js";

export const getListUsers = async (req, res) => {
  try {
    const listUsers = await UserModel.find({});
    res.status(200).json(listUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getListArticles = async (req, res) => {
  try {
    const listArticles = await ArticleModel.find({});
    res.status(200).json(listArticles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const deleteUser = async (req, res) => {
  const json_data = req.body;
  const result = [];

  for (let i in json_data) result.push(json_data[i]);
  console.log(result);
  try {
    await UserModel.deleteMany({
      _id: { $in: result },
    });
    res.status(200).send("Success");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
