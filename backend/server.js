import express from "express";
import cors from "cors";
import Docker from "dockerode";

const app = express();
const docker = new Docker();
const PORT = 4092;

app.set('trust proxy', true);
app.use(cors());
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

app.post("/api/restart", async (req, res) => {
  const { container } = req.body;

  if (!container) {
    return res.status(400).json({ error: "Container ID is required" });
  }

  try {
    console.log(`Attempting to restart container: ${container}`);
    const dockerContainer = docker.getContainer(container);
    
    // Verify container exists
    await dockerContainer.inspect();
    
    // Attempt restart
    await dockerContainer.restart();
    console.log(`Successfully restarted container: ${container}`);
    
    res.json({ message: "Container restarted successfully!" });
  } catch (error) {
    console.error("Error restarting container:", error.message);
    
    if (error.statusCode === 404) {
      return res.status(404).json({ error: "Container not found" });
    }
    
    res.status(500).json({ 
      error: "Failed to restart container",
      details: error.message 
    });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
