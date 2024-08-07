import { getDb } from "../config/database.js";
import { getUrlId, getUrlsFromIds } from "./urlService.js";
import { ObjectId } from "mongodb";

export async function addLink(link, userId) {
  const db = getDb();
  const collection = db.collection("users");
  const urlId = await getUrlId(link);
  if (!urlId) {
    return false;
  }
  try {
    await collection.updateOne(
      { _id: new ObjectId(userId) },
      { $push: { links: urlId } }
    );
    return true;
  } catch (e) {
    console.error("Could not add link to user", e);
    return false;
  }
}

export async function getLinks(userId) {
  const db = getDb();
  const collection = db.collection("users");
  try {
    const userData = await collection.findOne({
      _id: new ObjectId(userId),
    });
    if (!userData) {
      return [];
    }
    const urls = await getUrlsFromIds(userData.links);
    return urls;
  } catch (e) {
    console.error("Could not get links", e);
    return [];
  }
}

export async function deleteLink(linkId, userId) {
  const db = getDb();
  const collection = db.collection("users");
  try {
    await collection.updateOne(
      { _id: new ObjectId(userId) },
      { $pull: { links: new ObjectId(linkId) } }
    );
    return true;
  } catch (e) {
    console.error("Could not delete link", e);
    return false;
  }
}
