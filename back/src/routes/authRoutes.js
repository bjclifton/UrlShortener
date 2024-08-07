import express from "express";
import {
  register,
  login,
  logout,
  checkAuth,
  health,
} from "../controllers/authController.js";
import passport from "passport";

const router = express.Router();

router.post("/register", register);
router.post("/login", passport.authenticate("local"), login);
router.post("/logout", logout);
router.get("/checkAuth", checkAuth);
router.get("/health", health);

export default router;

