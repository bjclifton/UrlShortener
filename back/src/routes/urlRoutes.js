import express from 'express';
import { createUrl, redirectToUrl } from '../controllers/urlController.js';

const router = express.Router();

router.post('/shorten', createUrl);
router.get('/:shortCode', redirectToUrl);

export default router;

