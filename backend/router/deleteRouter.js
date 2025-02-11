const express = require("express");

const deleteRouter = express.Router()

const {DeleteHandler} = require("../controller/DeleteHandler")

deleteRouter.get("/:content" , DeleteHandler )


module.exports = deleteRouter