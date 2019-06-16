const dbConnection = require('../db_connection.js');

// const getUsers = cb => {
//   dbConnection.query('SELECT * FROM users ', (err, res) => {
//     if (err) return cb(err);
//     console.log("res.rows: ", res.rows);
//     cb(null, res.rows);
//   })
// };

const getPass = (email, cb) => {
  dbConnection.query(`SELECT password FROM users WHERE email = ($1)`, [email], (err, res) => {
    if (err)  console.log(err);
    else {
      console.log(res);
    }
    // if (res.rows.length < 1) return cb(null, );
    // cb(null, res.rows[0].password);
  });
};

const getInfo = cb => {
  dbConnection.query('SELECT * FROM info', (err, res) => {
    if (err) return cb(err);
    console.log("res.rows: ", res.rows);
    cb(null, res.rows);
  });
};


module.exports = {
  // getUsers,
  getPass,
  getInfo

};
