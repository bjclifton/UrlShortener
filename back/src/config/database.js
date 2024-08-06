import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
  
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, '../../.env');

dotenv.config({ path: envPath });
  
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let db;

export async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to database');
    db = client.db('myFirstDatabase');
    return db;
  } catch (e) {
    console.error("Could not connect to database", e);
    process.exit(1);
  }
}

export function getDb() {
  return db;
}

export async function closeDb() {
  await client.close();
  console.log('Disconnected from database');
}

