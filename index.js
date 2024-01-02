const express = require("express");
const puppeteer = require("puppeteer");
const ejs = require("ejs");
const path = require("path");
const { data } = require("./data/data");
const cors = require("cors");

const app = express();

// set cors
app.use(cors());

app.use(express.json());
app.use(express.static("public"));

// Set EJS as the view engine
app.set("view engine", "ejs");

// Set views directory
// app.set("views", path.join(__dirname, "templates"));

// app.get("/test", async (req, res) => {
//   res.render("index", { data });
// });

app.post("/api/cv", async (req, res) => {
  const data = JSON.parse(req.body.data);
  console.log("generate cv", data);
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
  await page.setViewport({ width: 800, height: 1000, deviceScaleFactor: 4 });

  // Set the content of the page
  await page.setContent(html);

  // generate time
  var milis = new Date();
  milis = milis.getTime();

  const baseName = `cv_${data.infos.firstName}_${milis}`;
  const imageName = baseName + `.jpeg`;
  const pdfName = baseName + `.pdf`;

  // Generate the PDF
  await page.pdf({
    path: path.join(__dirname, "public", pdfName),
    format: "A4",
  });

  await page.screenshot({
    path: path.join(__dirname, "public", imageName),
    type: "jpeg",
    quality: 100,
  });

  // Set appropriate response headers
  await browser.close();

  res.json({ img: imageName, pdf: pdfName });
});

app.listen(3001, () => console.log("Server started on port 3001"));
