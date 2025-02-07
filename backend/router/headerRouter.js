const express = require('express');
const router = express.Router();
const headerController = require('../controller/HeaderController');

router.put('/:id', headerController.deleteHeader);

module.exports = router;