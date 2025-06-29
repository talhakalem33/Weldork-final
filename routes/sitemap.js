const express = require("express");
const router = express.Router();
const { SitemapStream, streamToPromise } = require("sitemap");
const { Readable } = require("stream");
const config = require("../config");

router.get("/sitemap.xml", async (req, res) => {
  try {
    const links = [
      { url: "/", changefreq: "daily", priority: 1.0 },
      { url: "/about", changefreq: "monthly", priority: 0.8 },
      { url: "/contact", changefreq: "monthly", priority: 0.7 },
      { url: "/appoinment", changefreq: "monthly", priority: 0.6 },
    ];

    const stream = new SitemapStream({ hostname:  config.website.hostname }); 

    const xml = await streamToPromise(Readable.from(links).pipe(stream)).then((data) =>
      data.toString()
    );

    res.header("Content-Type", "application/xml");
    res.send(xml);
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

module.exports = router;