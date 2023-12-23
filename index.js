const express = require("express");
const puppeteer = require("puppeteer");
const ejs = require("ejs");
const path = require("path");
const { data } = require("./data/data");
const cors = require("cors");

const app = express();

// set cors
app.use(cors());

app.use(express.static("public"));

// Set EJS as the view engine
app.set("view engine", "ejs");

app.get("/api/", async (req, res) => {
  res.json("hello world");
});

app.get("/api/cv", async (req, res) => {
  console.log("generate cv");
  // Render the EJS template
  const html = await ejs.renderFile(
    path.join(__dirname, "templates", "index.ejs"),
    { data }
  );

  // Launch Puppeteer browser
  const browser = await puppeteer.launch({ headless: "new" });

  // Create a new page
  const page = await browser.newPage();

  // Set the viewport size
  await page.setViewport({ width: 800, height: 1000 });

  // Set the content of the page
  await page.setContent(html);

  // generate time
  var milis = new Date();
  milis = milis.getTime();

  const fileName = `cv_${data.infos.firstName}_${milis}`;

  // Generate the PDF
  await page.pdf({
    path: path.join(__dirname, "public", "media", fileName + `.pdf`),
    format: "A4",
  });

  await page.screenshot({
    path: path.join(__dirname, "public", "images", fileName + `.png`),
    type: "png",
  });

  // Set appropriate response headers
  await browser.close();

  res.json({ img: fileName + `.png`, pdf: fileName + `.pdf` });
});

app.listen(3001, () => console.log("Server started on port 3001"));
