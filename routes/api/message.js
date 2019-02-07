const express = require("express");
const router = express.Router();

// Item Model
const Message = require("../../models/message");

// @route   GET api/todos
// @desc    Get All Todos
// @access  Public
router.get("/", (req, res) => {
  Message.find()
    .sort({ date: 1 })
    .then(messages => res.json(messages));
});

module.exports = router;
