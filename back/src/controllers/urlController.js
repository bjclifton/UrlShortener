import { createShortUrl, getOriginalUrl } from '../services/urlService.js';

export async function createUrl(req, res) {
  try {
    const { url } = req.body;
    const shortCode = await createShortUrl(url);
    res.json({ shortUrl: `${process.env.BASE_URL}/${shortCode}` });
  } catch (e) {
    res.status(500).json({ error: "An error occured while creating the short URL" });
  }
}

export async function redirectToUrl(req, res) {
  try {
    const { shortCode } = req.params;
    const originalUrl = await getOriginalUrl(shortCode);
    if (originalUrl) {
      res.redirect(originalUrl);
    } else {
      res.status(404).json({ error: "URL not found" });
    }
  } catch (e) {
    console.error("Error while redirecting to original URL", e);
    res.status(500).json({ error: "An error occured while redirecting to the original URL"});
  }
}

