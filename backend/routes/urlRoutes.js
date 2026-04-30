const express = require("express");
const { nanoid } = require("nanoid");
const Url = require("../models/Url");

const router = express.Router();

const BASE_URL = "http://localhost:3000";

// Create short URL
router.post("/shorten", async (req, res) => {
  try {
    const { longUrl, customCode } = req.body;

    // If user gives custom code → use it
    let shortCode = customCode || nanoid(6);

    // Check if already exists
    const existing = await Url.findOne({ shortCode });
    if (existing) {
      return res.status(400).json({ error: "Short code already taken" });
    }

    const newUrl = await Url.create({
      longUrl,
      shortCode,
    });

    res.json({
      shortUrl: `${BASE_URL}/${shortCode}`,
    });

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Redirect
router.get("/:code", async (req, res) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.code });

    if (!url) {
      return res.status(404).send("Not found");
    }

    url.clicks++;
    await url.save();

    res.redirect(url.longUrl);

  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
