import express from "express";
const  router = express.Router();
import { register,login, registerAdmin, resetPasssword, sendEmail } from "../controllers/auth.controller.js";
// import {  } from "../controllers/auth.controller.js";



// Register
router.post("/register", register);

// Login
router.post("/login",  login)

// Register As Admin
router.post("/register-admin", registerAdmin);

// Sendd Email
router.post("/send-email", sendEmail);

// Reset Password
router.post("/reset-password", resetPasssword)

export default router;