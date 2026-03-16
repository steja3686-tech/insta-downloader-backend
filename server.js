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
    const api = `https://snapinsta.app/api/ajaxSearch`;

    const response = await axios.post(
      api,
      new URLSearchParams({
        q: url,
        vt: "home"
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );

    const data = response.data;

    res.json({
      result: data
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