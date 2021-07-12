import jwt from "jsonwebtoken";
import { UserModel } from "../model/user.js";

export const verifyUser = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const verified = jwt.verify(token, process.env.SECRET_SIGN);
    req.user = verified;
    res.send(req.user);
  } catch (err) {
    res.status(400);
  }
};

export const verifyAdmin = async (req, res, next) => {
  const _id = req.params.id;
  try {
    const admin = await UserModel.findById(_id);
    if (admin.role === "admin") {
      next();
    } else {
      res.status(400).send("You aren't admin");
    }
  } catch (err) {
    res.status(400);
  }
};
