const mongoose = require('mongoose')

const headerCms = new mongoose.Schema({
    content : {
        type : [String],
        
    }
})

module.exports = mongoose.model('header' , headerCms)