import { nanoid } from "nanoid";
import { getDb } from "../config/database.js";

export async function createShortUrl(originalUrl) {
  const db = getDb();
  const shortCode = nanoid(8);
  const collection = db.collection("urls");

  try {
    // Look if short code already exists
    const existing = await collection.findOne({ shortCode });
    if (existing) {
      return createShortUrl(originalUrl);
    }

    // Check if url already exists
    const url = await collection.findOne({ originalUrl });
    if (url) {
      return url.shortCode;
    }

    await collection.insertOne({ originalUrl, shortCode });
    return shortCode;
  } catch (e) {
    console.error("Could not create short URL", e);
    return null;
  }
}

export async function getOriginalUrl(shortCode) {
  const db = getDb();
  const collection = db.collection("urls");
  try {
    const url = await collection.findOne({ shortCode });
    return url ? url.originalUrl : null;
  } catch (e) {
    console.error("Could not get original URL", e);
    return null;
  }
}
