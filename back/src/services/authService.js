import bcrypt from 'bcryptjs';
import { ObjectId } from 'mongodb';
import { getDb } from '../config/database.js';

export const findUserByUsername = async (username) => {
  const db = getDb();
  try {
    return await db.collection('users').findOne({ username });   
  }
  catch (error) {
    console.error('Error occurred while finding user by username', error);
  }
}

export const createUser = async (username, password) => {
  const db = getDb();
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      username,
      password: hashedPassword,
      links: []
    };
    await db.collection('users').insertOne(newUser);
    return newUser;
  }
  catch (error) {
    console.error('Error occurred while creating user', error);
  }
}

export const comparePassword = async (plainTextPassword, hashedPassword) => {
  const db = getDb();
  try {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  }
  catch (error) {
    console.error('Error occurred while comparing passwords', error);
  }
}

export const findUserById = async (id) => {
  const db = getDb();
  try {
    return await db.collection('users').findOne({ _id: new ObjectId(id) });
  }
  catch (error) {
    console.error('Error occurred while finding user by id', error);
  }
}

