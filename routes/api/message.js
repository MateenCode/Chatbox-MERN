const express = require("express");
const router = express.Router();

// Item Model
const Message = require("../../models/message");

// @route   GET api/messages
// @desc    Get all messages my assending order
// @access  Public
router.get("/messages", (req, res) => {
  Message.find()
    .sort({ date: 1 })
    .then(messages => res.json(messages));
});

module.exports = router;
