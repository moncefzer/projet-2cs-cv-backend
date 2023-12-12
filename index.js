const express = require("express");
const puppeteer = require("puppeteer");
const ejs = require("ejs");
const path = require("path");
const { data } = require("./data/data");
const cors = require("cors");

const app = express();

// set cors
app.use(cors({}));

// Set EJS as the view engine
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  res.json("hello world");
});

app.get("/cv", async (req, res) => {
  console.log("generate cv");
  // Render the EJS template
  const html = await ejs.renderFile(
    path.join(__dirname, "templates", "index.ejs"),
    { data }
  );

  // Launch Puppeteer browser
  const browser = await puppeteer.launch();

  // Create a new page
  const page = await browser.newPage();

  // Set the viewport size
  await page.setViewport({ width: 800, height: 600 });

  // Set the content of the page
  await page.setContent(html);

  // generate time
  var milis = new Date();
  milis = milis.getTime();

  // Generate the PDF
  const filePath = path.join(
    __dirname,
    "media",
    `cv_${data.infos.firstName}_${milis}.pdf`
  );
  const pdf = await page.pdf({
    path: filePath,
    format: "A4",
    height: "400px",
  });

  // Set appropriate response headers
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", 'inline; filename="sample.pdf"'); // Display inline, not as an attachment

  // Send the PDF data to the client
  res.sendFile(filePath);

  // Close Puppeteer browser
  await browser.close();
});

app.listen(3001, () => console.log("Server started on port 3000"));
