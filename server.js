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

    const api = `https://api.douyin.wtf/api?url=${encodeURIComponent(url)}`;

    const response = await axios.get(api);

    const video = response.data?.data?.play;

    if (!video) {
      return res.json({ error: "Video not found" });
    }

    res.json({
      video: video
    });

  } catch (err) {

    res.json({
      error: "Failed to fetch video"
    });

  }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});