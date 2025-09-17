import express, { json } from "express";
import routes from "./routes/route.js";
import dotenv from "dotenv";
import devices from "./routes/devices.js";

// Load environment variables first
dotenv.config();

const app = express();

// Middleware
app.use(json());

// Routes
app.use("/", routes);
app.use("/api", devices);

// Server port from .env
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
