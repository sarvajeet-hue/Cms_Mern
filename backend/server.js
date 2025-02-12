const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const Header = require("../backend/model/Header");

const deleteRouter = require("./router/deleteRouter");


const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/cms", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));
  
// Page Schema
const PageSchema = new mongoose.Schema({
  title: String,
  slug: String, // URL friendly title
  content: String,
  createdAt: { type: Date, default: Date.now },
});

const Page = mongoose.model("Page", PageSchema);

app.use('/api/headerDelete' , deleteRouter)


// API Routes
app.get("/api/pages", async (req, res) => {
  const pages = await Page.find();
  res.json(pages);
});

app.get("/api/pages/:slug", async (req, res) => {
  const page = await Page.findOne({ slug: req.params.slug });
  if (!page) return res.status(404).json({ message: "Page not found" });
  res.json(page);
});

app.post("/api/pages", async (req, res) => {
  const { title, content } = req.body;
  const slug = title.toLowerCase().replace(/ /g, "-"); // Generate URL slug
  const newPage = new Page({ title, slug, content });
  await newPage.save();
  res.json(newPage);
});

app.post("/api/header", async (req, res) => {
  let { content } = req.body;
  console.log("Received content:", content);
  const newHeader  = new Header({content})

  await newHeader.save();
  res.json(newHeader);
});

app.get("/api/headerContent", async (req, res) => {
    try {
      const headercontent = await Header.findOne(); // Assuming only one document
      if (!headercontent) {
        return res.status(404).json({ message: "No header content found" });
      }
  
      console.log("Header content fetched:", headercontent);
  
      // Directly return the content if it's a single document
      const combinedContent = headercontent.content;
  
      console.log("Combined content:", combinedContent);
  
      res.json(combinedContent);
    } catch (error) {
      console.error("Error fetching header content:", error);
      res.status(500).json({ error: "Error fetching header content" });
    }
  });

app.put("/api/headerContent", async (req, res) => {
    try {
      let { content } = req.body;
      console.log("Received content:", content);
      
      // Find the header content by ID and update it
      const updatedHeader = await Header.findOneAndUpdate(
        {}, // Empty condition means it updates the first found document (assuming only one document exists), 
        
        { content }, // Set the new content
        { new: true, upsert: true } // Return the updated document
      );
      console.log(
        "updatedHeader",
        updatedHeader
      )
  
      // If no document was found, return an error
      if (!updatedHeader) {
        return res.status(404).json({ error: "Header content not found!" });
      }
  
      // Return success response with the updated content
      res.json({
        message: "Header content updated successfully!",
        content: updatedHeader.content,
      });
    } catch (error) {
      console.error("Error updating header content:", error);
      res.status(500).json({ error: "Error updating header content" });
    }
  });
  
  

app.listen(5000, () => console.log("Server running on port 5000"));
