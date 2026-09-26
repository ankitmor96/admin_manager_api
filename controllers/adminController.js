const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
import HttpError from "../middleware/HttpError.js";

async function registerAdmin(req, res) {
  try {
    const {
      username,
      email,
      password,
      confirmPasseord,
      confirm_password,
      status
    } = req.body;

    if (
      !requiredString(username) ||
      !requiredString(email) ||
      !requiredString(password) ||
      !requiredString(confirm_password)
    ) {
      return next(new HttpError("all field are required", 404));
    }

    const admin = await Admin.create({
      username,
      email,
      password,
      confirmPasseord,
      status,
      created_date,
      updated_date
    });

    return res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      admin
    });
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Admin registration failed",
    });
  }
}


async function loginAdmin(req, res) {
  try {
    const { email, password } = req.body;

    const adminLogin = await Admin.findByCredentials(email,password);

    if(!adminLogin){
      return next(new HttpError("adminlogin data not found",404));
    }

    const token = await adminLogin.generateAuthToken();

    if(!token){
      return next(new HttpError("token not found",404));
    }

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      adminLogin
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

const logOut = async (req, res, next) => {
    try {
        req.admin.tokens = req.user.tokens.filter((t) => t.token !== req.token);

        await req.user.save();

        res.status(200).json({
            success: true,
            message: "logout successFully",

        });
    } catch (error) {
        return next(HttpError(error.message, 500));
    }
};

const deleteAdmin = async (req, res, next) => {
    try {

        const TargetUser = req.params.id || req.admin._id;

        const admin = await Admin.findById(TargetUser);

        if (!admin) {
            return next(new HttpError("user data not defined", 404));
        }

        await admin.deleteOne();

        res.status(200).json({
            success: true,
            message: "delete successFully",

        });
    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
};

export default { registerAdmin , loginAdmin , logOut , deleteAdmin };