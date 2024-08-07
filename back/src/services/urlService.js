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
export async function getUrlId(shortCode) {
  const db = getDb();
  const collection = db.collection("urls");
  try {
    const url = await collection.findOne({ shortCode });
    return url ? url._id : null;
  } catch (e) {
    console.error("Could not get URL ID", e);
    return null;
  }
}

export async function getUrlFromId(id) {
  const db = getDb();
  const collection = db.collection("urls");
  try {
    const url = await collection.findOne({ _id: id });
    return url ? url.originalUrl : null;
  } catch (e) {
    console.error("Could not get URL from ID", e);
    return null;
  }
}

export async function getUrlsFromIds(ids) {
  const db = getDb();
  const collection = db.collection("urls");
  try {
    const urls = await collection.find({ _id: { $in: ids } }).toArray();
    return urls.map((url) => ({
      originalUrl: url.originalUrl,
      shortUrl: `${process.env.BASE_URL}/${url.shortCode}`,
    }));
  } catch (e) {
    console.error("Could not get URLs from IDs", e);
    return null;
  }
}
