import jwt from "jsonwebtoken";
import HttpError from "./HttpError.js"
import Admin from "../models/Admin.js";

const adminAuth  = async function (req, res, next) {
  try {
    const authHeader = req.headers(Authorization);

    if (!authHeader) {
      return next(new HttpError("authheader is not define",404));
    }

    const token = authHeader.replace("Bearer ", "");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await Admin.findOne({
            _id: decoded._id,
            "tokens.token": token,
        });

        if(!admin){
          return next(new HttpError("admin data not found",404));
        }

    req.admin = admin;

    req.token = token;

    next();

  } catch (error) {
    return next(new HttpError("rout not found",404));
  }
};

export default adminAuth;