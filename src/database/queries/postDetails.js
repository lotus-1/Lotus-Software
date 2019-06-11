const dbConnection = require('../db_connection.js');

const postDetails = (username, first_name, last_name, email, password, age, gender, high_school_deploma,  cb) => {
  db.query(
    `INSERT INTO userdetails (username, first_name, last_name, email, password, age, gender, high_school_deploma) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [username, first_name, last_name, email, password, age, gender, high_school_deploma],
    (err, res) => {
      if (err) return cb(err);
      cb(null, res);
    }
  );
};
