import { connectToDatabase, closeDb } from "./config/database.js";
import urlRoutes from "./routes/urlRoutes.js";
import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

connectToDatabase();

app.use("/", urlRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on("SIGINT", async () => {
  await closeDb();
  process.exit(0);
});

