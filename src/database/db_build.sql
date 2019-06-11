BEGIN;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(30) NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  age VARCHAR(2) NOT NULL,
  gender VARCHAR(30) NOT NULL,
  high_school_deploma VARCHAR(3) NOT NULL
);

COMMIT;
