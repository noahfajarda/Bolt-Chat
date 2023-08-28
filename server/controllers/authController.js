// integrate PostgreSQL db
const pool = require("../db.js")
const bcrypt = require("bcrypt")
const { signToken } = require('../utils/auth');
const { v4: uuidv4 } = require("uuid");

module.exports.attemptLogin = async (req, res) => {

  // hash entered password
  const hashedPass = await bcrypt.hash(req.body.password, 10);

  // query to check if user already exists
  const existingUser = await pool.query("SELECT id, username, passhash, userid FROM users WHERE username=$1", [req.body.username]);

  if (existingUser.rowCount > 0) {
    // compare USER ENTERED password with the DB pass HASH
    const isSamePass = await bcrypt.compare(
      req.body.password,
      existingUser.rows[0].passhash
    );

    // if password hashes match...
    if (isSamePass) {
      const username = req.body.username;
      // login
      req.session.user = {
        username,
        id: existingUser.rows[0].id,
        userid: existingUser.rows[0].userid
      }
      const token = signToken(req.session)

      return res.json({ loggedIn: true, username, token });
    } else {
      // dont' log in
      console.log("Login failed")
      return res.json({ loggedIn: false, status: "Wrong username or password!" })
    }


  } else {
    // if USER NOT GOOD, don't log in
    return res.json({ loggedIn: false, status: "Wrong username or password!" })
  }
}

module.exports.attemptRegister = async (req, res) => {
  // query to check if user already exists
  const existingUser = await pool.query("SELECT username FROM users WHERE username=$1", [req.body.username]);

  if (existingUser.rowCount === 0) {
    // register with 'hashed password' & 'insert user' query
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const newUserQuery = await pool.query("INSERT INTO users(username, passhash, userid) values($1,$2,$3) RETURNING id, username, userid",
      [req.body.username, hashedPass, uuidv4()]);

    // save additional information into user 'session'
    req.session.user = {
      username: req.body.username,
      id: newUserQuery.rows[0].id,
      userid: newUserQuery.rows[0].userid
    }

    // encode JWT
    const token = signToken(req.session)

    res.json({ loggedIn: true, username: req.body.username, token });
  } else {
    // username already exists
    res.json({ loggedIn: false, status: "Username taken" });
  }

}