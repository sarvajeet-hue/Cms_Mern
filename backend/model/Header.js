const mongoose = require("mongoose");

const HeaderSchema = new mongoose.Schema({
    content: { type: [String] }, // Store HTML from ReactQuill
});

module.exports = mongoose.model("Header", HeaderSchema);
