const dbConnection = require('../db_connection.js');

const postUsers = (username, email, password, cb) => {
  db.query(
    `INSERT INTO users (username, email, password) VALUES ($1, $2, $3, $4)`,
    [username, email, password],
    (err, res) => {
      if (err) return cb(err);
      cb(null, res);
    }
  );
};

const postInfo = (first_name, last_name, age, gender, high_learning, email, cb) => {
  db.query(

    `INSERT INTO info (first_name, last_name, age, gender, high_learning, email) VALUES ($1, $2, $3, $4, $5, $6)`,
    [first_name, last_name, age, gender, high_learning, email],
    (err, res) => {
      if (err) return cb(err);
      cb(null, res);
    }
  );
};

module.export = {
  postUsers,
  postInfo
}
