const express = require("express");
const router = express.Router();
const path = require("path");
const postUsers = require("../database/queries/postDetails");
// const postInfo = require("../database/queries/postDetails");
const validate = require('../helpers/validate');
const {loginValidation, signupValidation} = require('../helpers/validation');
const hashPsw = require('../helpers/hashing')
// router.get("/userdeemail=mahaforo276%40gmail.com&psw=511tails", getDetails);

// router.post("/userdetails", postDetails);

router.get('/', (req,res) => {
  res.render(path.join(__dirname, '..', 'views', 'register'));
});

router.post('/register', validate(signupValidation), (req,res)=> {
  const { body:{ username, email, password, confirmPsw}}  = req;
    console.log(username,email,password);
    postUsers.postUsers(username, email, password, (response,request) => {
      if (request) {
        res.send("You already have an account")
      } else {
        res.send("User created")
      }
    })

  });

router.get('/login', (req,res) => {
  res.render(path.join(__dirname, '..', 'views', 'login'));
});

router.post('/login', validate(loginValidation), (req,res)=>{
  const{ body:{ email, password }}  = req;
    console.log(email,password);
  res.render(path.join(__dirname, '..', 'views', 'home'));
});

// router.get('/home', (req,res) => {
//   res.render(path.join(__dirname, '..', 'views', 'home'));
// });

router.get('/details', (req,res) => {
  res.render(path.join(__dirname, '..', 'views', 'details'));
});

router.post('/signup', validate(signupValidation), (req,res)=>{
  //const{ body:{ username, email, password, confirmPassword }}  = req;
  //console.log(username,email,password);
   res.json({succes: "signup validation is confirmed"})
});

router.post('login', validate(loginValidation), (req,res)=>{
res.json({succes: "login validation is confirmed"})
})

// app.get("/userdetails", (req, res) => {

// });
// const getDetailsIndex = response => {
//   let data = [];
//   getDetails((err, users) => {
//     data.push(users);
//   });
// };
module.exports = router;
