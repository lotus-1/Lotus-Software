const bcrypt = require('bcrypt');

const hashPsw = (password, cb) => {
  return bcrypt.hash(password, 10, (error, hash) => {
    if(error){
      cb(error);
    } else {
      console.log('hash password:', hash);
      cb(null, hash);
    }
  })
};

module.exports = hashPsw;
