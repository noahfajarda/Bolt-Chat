const express = require('express')
const router = express.Router()
const validateForm = require("../controllers/validateForm")

// specify routes
router.post("/login", (req, res) => {
  validateForm(req, res);
})

router.post("/signup", (req, res) => {
  validateForm(req, res);
})

module.exports = router;