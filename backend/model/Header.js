const mongoose = require('mongoose');

const headerCms = new mongoose.Schema({
    content: {
        type: [String],  // Array of strings
        required: true
    }
});

module.exports = mongoose.model('Header', headerCms);