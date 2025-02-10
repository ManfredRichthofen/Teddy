import express from "express";
import cors from "cors";
import Docker from "dockerode";

const app = express();
const docker = new Docker();
const PORT = 4092;

app.set('trust proxy', true);
app.use(cors({
  origin: ['https://crash.airhosts.org', 'http://localhost:5173'],
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
