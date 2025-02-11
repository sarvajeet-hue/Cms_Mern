const Header = require("../model/Header");

const deleteHeader = async (req, res) => {
    try{
        const content = req.body;     
        if(!content){
            return res.status(404).json({message: "content not found"});
        }
        const existed_content = await Header.findOne({content})
        if(!existed_content){
            return res.status(404).json({message: "content not found"});
        }

        console.log("existed_content" , existed_content);
        
        res.status(200).json({message: "Header deleted successfully"});

    }catch(error){
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    deleteHeader
}