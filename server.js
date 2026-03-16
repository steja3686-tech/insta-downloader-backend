const express = require("express");
const cors = require("cors");
const ytdlp = require("yt-dlp-exec");

const app = express();

app.use(cors());

app.get("/download", async (req, res) => {

  const url = req.query.url;

  if (!url) {
    return res.json({ error: "No URL provided" });
  }

  try {

    const info = await ytdlp(url, {
      dumpSingleJson: true,
      noWarnings: true,
      preferFreeFormats: true
    });

    const video = info.url || info.formats?.[0]?.url;

    res.json({
      title: info.title,
      video: video
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