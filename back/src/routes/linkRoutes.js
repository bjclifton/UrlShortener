import express from "express";
import { addLinkForUser, getLinksForUser, deleteLinkForUser } from "../controllers/linkController.js";
import { requireAuth } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", requireAuth, addLinkForUser);
router.get("/", requireAuth, getLinksForUser);
router.delete("/:linkId", requireAuth, deleteLinkForUser);

export default router;
