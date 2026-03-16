const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/download", async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.json({ error: "No URL provided" });
  }

  try {
    const api = `https://igram.world/api/convert?url=${encodeURIComponent(url)}`;

    const response = await axios.get(api);

    if (!response.data || !response.data.url) {
      return res.json({ error: "Video not found" });
    }

    res.json({
      video: response.data.url
    });

  } catch (error) {
    res.json({
      error: "Download failed"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});