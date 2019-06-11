const dbConnection = require('../db_connection.js');

const getUsers = cb => {
  dbConnection.query('SELECT * FROM users', (err, res) => {
    if (err) return cb(err);
    console.log("res.rows: " + res.rows);
    cb(null, res.rows);
  });
};

const getInfo = cb => {
  dbConnection.query('SELECT * FROM info', (err, res) => {
    if (err) return cb(err);
    console.log("res.rows: " + res.rows);
    cb(null, res.rows);
  });
};

module.exports = getDetails;
