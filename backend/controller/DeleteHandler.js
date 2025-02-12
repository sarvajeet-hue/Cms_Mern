const Header = require("../model/Header");

const DeleteHandler = async (req , res) => {
    try {
        const delete_Content = req.params.content;
        console.log('delete_Content', delete_Content)

        const existed_content = await Header.findOneAndUpdate(
            {},
            {
                $pull: {
                    content: delete_Content
                }
            },
            { new: true }
        );

        if(!existed_content){
            return res.status(404).json({message: "No data found"})
        }

        res.json(existed_content)
    }catch(error){
        console.log(error);
    }
}

module.exports = {
    DeleteHandler
}