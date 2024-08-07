import express from "express";
import { addLinkForUser, getLinksForUser } from "../controllers/linkController.js";
import { requireAuth } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", requireAuth, addLinkForUser);
router.get("/", requireAuth, getLinksForUser);

export default router;
