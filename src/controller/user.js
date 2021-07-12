import { UserModel } from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.SECRET_SIGN);
export const getUserRecord = async (req, res, next) => {
  try {
    const user = await UserModel.findByEmail({ _id: req.params.id });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const signup = async (req, res, next) => {
  const check = await UserModel.findOne({ username: req.body.username });
  if (check) {
    return res.status(400).json("User đã được đăng ký!");
  }
  try {
    const data = req.body;
    const user = await UserModel.create(data);
    if (user) {
      const token = jwt.sign({ user }, process.env.SECRET_SIGN, {
        expiresIn: "1d",
      });
      res.status(200).json({ token: token, user_id: user._id });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const signin = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ username: req.body.username });
    if (!user) {
      return res.status(400).json("Tài khoản chưa được đăng ký!");
    }
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
      return res.status(400).json("Sai mật khẩu!");
    }
    const token = jwt.sign({ user }, process.env.SECRET_SIGN, {
      expiresIn: "1d",
    });
    res.status(200).json({ token: token, user_id: user._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//google login
export const googleLogin = async (req, res) => {
  const { idToken } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience: process.env.CLIENT_ID,
    });
    const { email_verified, name, email, picture } = ticket.getPayload();
    if (email_verified) {
      const user = await UserModel.findOne({ email: email });
      if (!user) {
        const user = await UserModel.create({
          username: name,
          email: email,
          photo: picture,
          password: email + process.env.SECRET_SIGN,
        });
        const token = jwt.sign({ user }, process.env.SECRET_SIGN, {
          expiresIn: "1d",
        });
        res.status(200).json({ token: token, user_id: user._id });
      } else {
        const token = jwt.sign({ user }, process.env.SECRET_SIGN, {
          expiresIn: "1d",
        });
        res.status(200).json({ token: token, user_id: user._id });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
