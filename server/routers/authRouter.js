const express = require('express')
const router = express.Router()
const validateForm = require("../controllers/validateForm")

// import auth controller
const { handleLogin, attemptLogin, attemptRegister } = require("../controllers/authController")

// specify routes
router
  .route("/login")
  .get(handleLogin)
  .post(validateForm, attemptLogin)

router.post("/signup", validateForm, attemptRegister)

module.exports = router;