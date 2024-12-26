const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize } = require("sequelize");
const cors = require("cors");
const logger = require("./middleware/logger");
const authenticate = require("./middleware/auth");
const { paginateData } = require("./repositories/media-repository");
const { scraperSelenium } = require("./runner/scraper-selenium");

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(logger);
app.use(authenticate);

// Routes
app.post("/scrape", async (req, res) => {
  try {
    const { urls } = req.body;
    // const resultsCherio = scrapMedia(urls);
    const listUrlScraper = [];
    for (const url of urls) {
      listUrlScraper.push(scraperSelenium(url));
    }
    await Promise.allSettled(listUrlScraper);

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Paginated Data
app.get("/media", async (req, res) => {
  const { type, search, page = 1, limit = 10 } = req.query;
  const data = await paginateData(type, search, page, limit);
  res.json(data);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get("/login", (req, res) => {
  res.status(200).json({ message: "Login successful!" });
});

process.on("uncaughtException", function (err) {
  console.error(err);
});
