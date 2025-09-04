const express = require('express');
const Url = require('../models/url');
const shortid = require('shortid');

const router = express.Router();

router.get("/url/getall", async (req, res) => {
    try {
        const urls = await Url.find().sort({ createdAt: -1 });
        res.status(200).json(urls);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

router.post("/url/shorten", async (req, res) => {
    try {
        const urlEntries = req.body;

        if (!Array.isArray(urlEntries) || urlEntries.length === 0) {
            return res.status(400).json({ message: "Invalid input data" });
        }

        const newUrls = await Promise.all(
            urlEntries.map(async (entry) => {
                const { originalUrl, customAlias, expirationTime } = entry;

                if (!originalUrl) {
                    throw new Error("Original URL is required");
                }

                const shortCode = "api/" + customAlias || shortid.generate();

                const expireAt = expirationTime
                    ? new Date(Date.now() + expirationTime * 60 * 1000)
                    : new Date(Date.now() + 30 * 60 * 1000);

                return Url.create({
                    originalURL: originalUrl,
                    shortURL: shortCode,
                    expireAt
                });
            })
        );

        res.status(201).json({
            message: "URLs shortened successfully",
            urls: newUrls
        });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

router.get("/:shortCode", async (req, res) => {
    try {
        let { shortCode } = req.params;
        shortCode = "api/" + shortCode;
        const urlEntry = await Url.findOne({ shortURL: shortCode });

        if (!urlEntry) {
            return res.status(404).json({ message: "URL not found" });
        }

        // Increment analytics
        urlEntry.accessCount += 1;
        urlEntry.accessInfo.push({
            ipAddress: req.ip,
            userAgent: req.get('User-Agent')
        });

        await urlEntry.save();

        // Redirect to original URL
        return res.redirect(urlEntry.originalURL);

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

module.exports = router;
