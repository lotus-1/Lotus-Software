const dbConnection = require("../db_connection.js");

const getPass = (username, cb) => {
  dbConnection.query(
    `SELECT password FROM users WHERE username = ($1)`,
    [username],
    (err, res) => {
      if (err) console.log(err);
      console.log("res.rows: ", res.rows[0].password);
      cb(null, res.rows[0].password);
    }
  );
};

const getInfo = cb => {
  dbConnection.query("SELECT * FROM info", (err, res) => {
    if (err) return cb(err);
    console.log("res.rows: ", res.rows);
    cb(null, res.rows);
  });
};

module.exports = {
  getPass,
  getInfo
};
