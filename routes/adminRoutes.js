import express from "express";
const {registerAdmin,loginAdmin, default: adminController} = require("../controllers/adminController");

const router = express.Router();

router.post("/registerAdmin" , adminController.registerAdmin);

router.post("/loginAdmin", adminController.loginAdmin);

router.patch("/logOut", adminController.logOut);

router.delete("/deleteAdmin", adminController.deleteAdmin);

export default router;