const express = require('express')
const router = express.Router()
const validateForm = require("../controllers/validateForm")

// import auth controller
const { attemptLogin, attemptRegister } = require("../controllers/authController")
const { rateLimiter } = require('../controllers/rateLimiter')

// specify routes
router
  .route("/login")
  .post(validateForm, rateLimiter(60, 10), attemptLogin)

// rate limiter = limit 4 requests in 30 seconds
router.post("/signup", validateForm, rateLimiter(30, 4), attemptRegister)

module.exports = router;