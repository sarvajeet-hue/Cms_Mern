const Header = require("../model/Header");

const deleteHeader = async (req, res) => {
    try{
        const id = req.params.id;
        console.log("id" , id);
        const header = await Header.findByIdAndDelete(id);
        if(!header){
            return res.status(404).json({message: "Header not found"});
        }
        res.status(200).json({message: "Header deleted successfully"});

    }catch(error){
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    deleteHeader
}