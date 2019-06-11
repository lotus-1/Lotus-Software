const dbConnection = require('../db_connection.js');

const getDetails = cb => {
  dbConnection.query('SELECT * FROM users', (err, res) => {
    if (err) return cb(err);
    console.log("res.rows: " + res.rows);
    cb(null, res.rows);
  });
};

module.exports = getDetails;
