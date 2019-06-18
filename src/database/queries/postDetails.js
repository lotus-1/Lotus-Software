const db = require("../db_connection.js");

const postUsers = (username, email, password, cb) => {
  console.log("this is my pass:", password);
  db.query(
    `INSERT INTO users (username, email, password) VALUES ($1, $2, $3)`,
    [username, email, password],
    (err, res) => {
      if (err) return cb(err);
      cb(null, res);
    }
  );
};

const postInfo = (
  first_name,
  last_name,
  age,
  gender,
  email,
  cb
) => {
  console.log("i am in postInfo")
  console.log("this is the firstname in postInfo:", first_name);
  db.query(
    `INSERT INTO info (first_name, last_name, age, gender, email) VALUES ($1, $2, $3, $4, $5)`,
    [first_name, last_name, age, gender, email],
    (err, res) => {
      if (err) return cb(err);
      else {
        console.log("user added");
        cb(null, res);
      }
    }
  );
};

module.exports = {
  postUsers,
  postInfo
};
