const express = require("express");
const puppeteer = require("puppeteer");
const ejs = require("ejs");
const path = require("path");
const { data } = require("./data/data");
const cors = require("cors");

const app = express();

// set cors
app.use(cors());

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
  const browser = await puppeteer.launch({headless: "new"});

  // Create a new page
  const page = await browser.newPage();

  // Set the viewport size
  await page.setViewport({ width: 800, height: 1000 });

  // Set the content of the page
  await page.setContent(html);

  // generate time
  var milis = new Date();
  milis = milis.getTime();

  const fileName = `cv_${data.infos.firstName}_${milis}`

  // Generate the PDF
  const filePath = path.join(
    __dirname,
    "media",
    fileName + `.pdf`
  );

  const pdf = await page.pdf({
    path: filePath,
    format: "A4",
    height: "400px",
  });
  await page.screenshot({
    path: `images\\`+ fileName + `.png`,
    type: "png",
  });
  // Set appropriate response headers
  await browser.close();

  // res.setHeader("Content-Type", "application/pdf");
  // res.setHeader("Content-Disposition", 'inline; filename="cv.pdf"'); // Display inline, not as an attachment

  // // Send the PDF data to the client
  // res.send(pdf);

  res.sendFile(path.join(__dirname, 'images', `${fileName}.png`));

  // Close Puppeteer browser
});

// app.get('/pdf', (req, res) => {

//   const fileName = `cv_Moncef_1702512408813`

//   // Generate the PDF
//   const filePath = path.join(
//     __dirname,
//     "media",
//     fileName + `.pdf`
//   );

//   res.setHeader("Content-Type", "application/pdf");
//   res.setHeader("Content-Disposition", 'inline; filename="cv.pdf"');

//   res.sendFile(filePath)
// })

app.listen(3001, () => console.log("Server started on port 3001"));
