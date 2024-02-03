// Import required modules
const express = require("express");
const puppeteer = require("puppeteer");
const ejs = require("ejs");
const path = require("path");
const { data: testData } = require("./data/data");
const cors = require("cors");
require("dotenv").config();

// Initialize Express app
const app = express();
let browser; // Variable to store the Puppeteer browser instance

// Function to initialize the Puppeteer browser if it doesn't exist
const initializeBrowser = async () => {
  if (!browser) {
    browser = await puppeteer.launch({
      headless: "new",
      args: [
        "--disable-setuid-sandbox",
        "--no-sandbox",
        // "--single-process",
        "--no-zygote",
      ],
      executablePath:
        process.env.NODE_ENV === "production"
          ? process.env.PUPPETEER_EXECUTABLE_PATH
          : puppeteer.executablePath(),
    });
  }
};

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Middleware for parsing JSON requests
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Set EJS as the view engine
app.set("view engine", "ejs");

// Set views directory
app.set("views", path.join(__dirname, "templates"));

// Default route
app.get("/", async (req, res) => {
  res.send("cv api !!");
});

// Test route to render EJS template with test data
app.get("/test", async (req, res) => {
  res.render("index", { data: testData });
});

// Route to generate CV in PDF and image format
app.post("/api/cv", async (req, res) => {
  const data = req.body.data;
  // console.log("generate cv", data);

  try {
    // Render the EJS template
    const html = await ejs.renderFile(
      path.join(__dirname, "templates", "index.ejs"),
      { data }
    );

    // Ensure the browser is initialized
    await initializeBrowser();

    // Create a new page
    const page = await browser.newPage();

    // Set the viewport size
    await page.setViewport({ width: 800, height: 1000, deviceScaleFactor: 4 });

    // Set the content of the page
    await page.setContent(html);

    // Generate unique names for PDF and image files
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

    // Capture a screenshot of the page as an image
    await page.screenshot({
      path: path.join(__dirname, "public", imageName),
      type: "jpeg",
      quality: 60,
    });

    // Close the browser instance
    await browser.close();

    // Respond with JSON containing file names
    res.json({ img: imageName, pdf: pdfName });
  } catch (error) {
    console.error("Error generating CV:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the Express app
app.listen(3001, () => console.log("Server started on port 3001"));
