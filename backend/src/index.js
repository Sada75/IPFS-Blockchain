import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import uploadRoutes from "./routes/upload.routes.js";
import retrieveRoutes from "./routes/retrieve.routes.js";
import fileRoutes from "./routes/file.routes.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

// Connect MongoDB
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/upload", uploadRoutes);
app.use("/api/retrieve", retrieveRoutes);
app.use("/api/files", fileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
