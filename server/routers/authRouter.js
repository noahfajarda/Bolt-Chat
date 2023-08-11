const express = require('express')
const router = express.Router()
const validateForm = require("../controllers/validateForm")
// integrate PostgreSQL db
const pool = require("../db.js")
const bcrypt = require("bcrypt")

// specify routes
router
  .route("/login")
  .get(async (req, res) => {
    console.log(req.session)
    if (req.session.user && req.session.user.username) {
      res.json({ loggedIn: true, username: req.session.user.username })
    } else {
      res.json({ loggedIn: false })
    }
  })
  .post(async (req, res) => {
    console.log(req.session)
    // form validation
    validateForm(req, res);

    // hash entered password
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    console.log(hashedPass)

    // query to check if user already exists
    const existingUser = await pool.query("SELECT id, username, passhash FROM users WHERE username=$1", [req.body.username]);
    console.log(existingUser)

    if (existingUser.rowCount > 0) {
      // compare USER ENTERED password with the DB pass HASH
      const isSamePass = await bcrypt.compare(
        req.body.password,
        existingUser.rows[0].passhash
      );
      console.log(isSamePass) // TRUE


      // if password hashes match...
      if (isSamePass) {
        const username = req.body.username;
        // login
        req.session.user = {
          username,
          id: existingUser.rows[0].id,
        }

        return res.json({ loggedIn: true, username, session: req.session });
      } else {
        // dont' log in
        console.log("Login failed")
        return res.json({ loggedIn: false, status: "Wrong username or password!" })
      }


    } else {
      // if USER NOT GOOD, don't log in
      return res.json({ loggedIn: false, status: "Wrong username or password!" })
    }
  })

router.post("/signup", async (req, res) => {
  // form validation
  validateForm(req, res);

  // query to check if user already exists
  const existingUser = await pool.query("SELECT username FROM users WHERE username=$1", [req.body.username]);

  if (existingUser.rowCount === 0) {
    // register with 'hashed password' & 'insert user' query
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const newUserQuery = await pool.query("INSERT INTO users(username, passhash) values($1,$2) RETURNING id, username",
      [req.body.username, hashedPass]);

    // save additional information into user 'session'
    req.session.user = {
      username: req.body.username,
      id: newUserQuery.rows[0].id,
    }

    res.json({ loggedIn: true, username: req.body.username, session: req.session });
  } else {
    // username already exists
    res.json({ loggedIn: false, status: "Username taken" });
  }

})

module.exports = router;