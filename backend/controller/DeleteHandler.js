const Header = require("../model/Header");

const DeleteHandler = async (req , res) => {
    try {
        const delete_Content = req.params.content;
        console.log('delete_Content', delete_Content)
    }catch(error){
        console.log(error);
    }
}

module.exports = {
    DeleteHandler
}