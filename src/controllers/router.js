const express = require("express");
const router = express.Router();
const path = require("path");


// const { getDetails, postDetails } = require("../Database/queries");
// const getDetails = require("../database/queries/getDetails");
// const postDetails = require("../database/queries/postDetails");
//
// router.get("/userdetails", getDetails);
// router.post("/userdetails", postDetails);

router.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'public', 'signing.html'));
});

router.get('/signbtn', (req, res)=> {
res.send('You already have an account');
});

router.get('/login', (req,res) => {
  res.render(path.join(__dirname, '..', 'views', 'login.hbs'));
});

router.get('/login', (req,res) => {
  res.render(path.join(__dirname, '..', 'views', 'login.hbs'));
});

router.get('/home', (req,res) => {
  res.render(path.join(__dirname, '..', 'views', 'home.hbs'));
});

router.get('/details', (req,res) => {
  res.render(path.join(__dirname, '..', 'views', 'details.hbs'));
});

// app.get("/userdetails", (req, res) => {
//   res.sendFile(__dirname, "controllers", "index.js");
//
// });
// const getDetailsIndex = response => {
//   let data = [];
//   getDetails((err, users) => {
//     data.push(users);
//   });
// };
module.exports = router;
