import {
  createUser,
  findUserByUsername,
  findUserById,
} from "../services/authService.js";
import { ObjectId } from "mongodb";

export const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    await createUser(username, password);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
};

export const login = async (req, res) => {
  try {
    const user = await findUserByUsername(req.body.username);
    if (user) {
      req.session.userId = user._id.toString();
      return res.json({
        message: "Logged in successfully",
        user: { _id: user._id, username: user.username },
      });
    } else {
      return res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
};

export const logout = (req, res) => {
  // Check if the user is authenticated
  if (req.session.userId) {
    // Destroy the session
    req.session.destroy((err) => {
      if (err) {
        // If there's an error destroying the session, log it and send an error response
        console.error("Error destroying session:", err);
        return res.status(500).json({ message: "Error logging out" });
      }

      // If the session was successfully destroyed, clear the session cookie
      res.clearCookie("connect.sid"); // 'connect.sid' is the default name for the session cookie in Express

      // Send a success response
      res.json({ message: "Logged out successfully" });
    });
  } else {
    // If there's no session (user wasn't logged in), just send a success response
    res.json({ message: "No active session to log out" });
  }
};

export const checkAuth = async (req, res) => {
  if (req.session.userId) {
    try {
      const user = await findUserById(new ObjectId(req.session.userId));
      if (user) {
        res.json({
          isAuthenticated: true,
          user: { id: user._id, username: user.username },
        });
      } else {
        res.json({ isAuthenticated: false, user: null });
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
      res.status(500).json({ message: "Error checking authentication" });
    }
  } else {
    res.json({ isAuthenticated: false, user: null });
  }
};

export const health = (req, res) => {
  return res.status(200).json({ message: "Health check OK" });
};

