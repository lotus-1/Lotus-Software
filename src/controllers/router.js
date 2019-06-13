const express = require("express");
const router = express.Router();
const path = require("path");
const { postUsers, postInfo } = require("../database/queries/postDetails");
const getUsers = require("../database/queries/getDetails");

// const postInfo = require("../database/queries/postDetails");
const validate = require('../helpers/validate');
const {loginValidation, signupValidation} = require('../helpers/validation');
const hashPsw = require('../helpers/hashing')

// router.post("/userdetails", postDetails);


router.get('/', (req,res) => {
  res.render(path.join(__dirname, '..', 'views', 'register'));
});

router.post('/register', validate(signupValidation), (req,res)=> {
  let dataArr = [];
  const { body:{ username, email, password, confirmPsw}}  = req;
    console.log('in route /register :', username,email,password);
    const data = req;
    // console.log("this is our data:", data);
    dataArr.push(data);
    // console.log("this is the dataArr:", dataArr);
    postUsers(username, email, password, (err, result) => {
      if (err) {
        console.log(err);
        // res.send("You already have an account")
      } else {
        console.log(result);
        // res.send("User created")
      }
    })

  });

  router.get('/userdetails', (req, res) => {
    getUsers.getUsers((error, response)=> {
      if (error) return error;
      res.json(response);
    });
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
