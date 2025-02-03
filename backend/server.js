const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/cms", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Page Schema
const PageSchema = new mongoose.Schema({
    title: String,
    slug: String, // URL friendly title
    content: String,
    createdAt: { type: Date, default: Date.now }
});

const Page = mongoose.model("Page", PageSchema);

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

app.listen(5000, () => console.log("Server running on port 5000"));
