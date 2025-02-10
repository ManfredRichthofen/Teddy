import express from "express";
import cors from "cors";
import Docker from "dockerode";

const app = express();
const docker = new Docker();
const PORT = process.env.PORT || 4092;

// Update CORS configuration to handle both development and production
const allowedOrigins = [
  'https://crash.airhosts.org',
  'http://localhost:5173',
  'http://localhost:4092'
];

app.set('trust proxy', true);
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? 'https://crash.airhosts.org'
    : ['http://localhost:5173', 'http://localhost:4092'],
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

// Define the only allowed container ID
const ALLOWED_CONTAINER = "mc-mc-1";

app.post("/api/restart", async (req, res) => {
  // We ignore any container provided in the request body
  try {
    console.log(`Attempting to restart container: ${ALLOWED_CONTAINER}`);
    const dockerContainer = docker.getContainer(ALLOWED_CONTAINER);
    await dockerContainer.restart();
    res.json({ message: "Container restarted successfully!" });
  } catch (error) {
    console.error("Error restarting container:", error);
    res.status(500).json({ error: "Failed to restart container" });
  }
});

// Add a test endpoint to verify the server is running
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
