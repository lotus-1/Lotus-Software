const jwt = require('jsonwebtoken');

const createCookie = (infoObj, cb) => {
  jwt.sign(infoObj,
    process.env.SECRET, (err, cookie) => {
      if (err) {
        console.log(err);
        return cb(err);
      }
      console.log(cookie);
      return cb(null, cookie);
    });
}

const verifyCookie = (cookie, cb) => {
  jwt.verify(cookie, process.env.SECRET, (err, result) => {
       if (err) {
        return cb(err);
       }
        return cb(null, result);
  });
}

module.exports = {
  createCookie,
  verifyCookie
}
