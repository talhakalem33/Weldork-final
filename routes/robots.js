const express = require("express");
const router = express.Router();
const config = require("../config");

router.get("/robots.txt", (req, res) => {
  res.type("text/plain");
  res.send(`User-agent: *
Disallow: /admin/

Sitemap: ${config.website.hostname}/sitemap.xml`);
});

module.exports = router;
