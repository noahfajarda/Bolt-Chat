CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  username VARCHAR(28) NOT NULL UNIQUE,
  -- hashed password
  passhash VARCHAR NOT NULL,
  userid VARCHAR NOT NULL UNIQUE
);

INSERT INTO users(username, passhash) values($1,$2);


-- useful commands
-- SELECT * FROM users; ---- get all users
-- DELETE FROM users; ---- delete all users
-- TRUNCATE TABLE users RESTART IDENTITY; ---- delete all users & reset user table ids