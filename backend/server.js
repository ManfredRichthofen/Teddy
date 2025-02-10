import express from "express";
import cors from "cors";
import Docker from "dockerode";

const app = express();
const docker = new Docker();
const PORT = 4092;

// Update CORS configuration to handle both development and production
const allowedOrigins = [
  'https://crash.airhosts.org',
  'http://localhost:5173',
  'http://localhost:4092'
];

app.set('trust proxy', true);
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('CORS policy violation'), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

app.post("/api/restart", async (req, res) => {
  const { container } = req.body;

  if (!container) {
    return res.status(400).json({ error: "Container ID is required" });
  }

  try {
    const dockerContainer = docker.getContainer(container);
    await dockerContainer.restart();
    res.json({ message: "Container restarted successfully!" });
  } catch (error) {
    console.error("Error restarting container:", error);
    res.status(500).json({ error: "Failed to restart container" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
