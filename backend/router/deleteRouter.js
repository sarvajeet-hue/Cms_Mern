const express = require("express");

const deleteRouter = express.Router()
const {DeleteHandler} = require("../controller/DeleteHandler")


deleteRouter.post("/:content" , DeleteHandler )


module.exports = deleteRouter