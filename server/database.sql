CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  username VARCHAR(28) NOT NULL UNIQUE,
  -- hashed password
  passhash VARCHAR NOT NULL
);

INSERT INTO users(username, passhash) values($1,$2);
