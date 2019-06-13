const express = require('express');
const routerAuth = express.Router();
const path = require("path");
const { verifyCookie } = require('../helpers/createJwt');


routerAuth.get('/details', (req,res) => {
  console.log('my cookie: ', req.headers.cookie);
  if (!req.headers.cookie) {
    res.status(403);
    res.send('Please signup or login');
  }
  let cookie = req.headers.cookie;
  cookie = cookie.split('=')[1];
  verifyCookie(cookie, (err, result) => {
    if (err) {
      console.log(err);
      res.status(403);
      res.send('not allowed');
    } else {
      console.log("user allowed to see details page");
      res.render(path.join(__dirname, '..', 'views', 'details'));
    }
  })
});




module.exports = routerAuth;
