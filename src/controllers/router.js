const express = require("express");
const router = express.Router();
const path = require("path");
const { postUsers, postInfo } = require("../database/queries/postDetails");
const getUsers = require("../database/queries/getDetails");

// const postInfo = require("../database/queries/postDetails");
const validate = require('../helpers/validate');
const {loginValidation, signupValidation} = require('../helpers/validation');
const hashPsw = require('../helpers/hashing');
const { createCookie } = require('../helpers/createJwt');

// router.get("/userdeemail=mahaforo276%40gmail.com&psw=511tails", getDetails);

// router.post("/userdetails", postDetails);


router.get('/', (req,res) => {
  res.render(path.join(__dirname, '..', 'views', 'register'));
});

router.post('/register', validate(signupValidation), (req,res)=> {
  const { username, email, password, confirmPsw} = req.body;
  hashPsw(password, (error, hashedPas) => {
  if(error) {
    console.log(error);
  } else {
    postUsers(username, hashedPas, email, (err, result) => {
      if (err) {
        console.log(err);
      }
      // res.send('<h1>Registration completed successfully</h1><button><a href="./login">Log</a></button>');
      res.render(path.join(__dirname, '..', 'views', 'message'));
    })
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
  const { email, psw } = req.body;
    console.log(req.body);
    createCookie({ email, psw }, (err, result) => {
      if (err) console.log(err);
      else {
        console.log(result);
        res.cookie('jwt', result);
        res.send('login successfull');
      }
    })
  });


// router.get('/home', (req,res) => {
//   res.render(path.join(__dirname, '..', 'views', 'home'));
// });

// router.get('/details', (req,res) => {
//   res.render(path.join(__dirname, '..', 'views', 'details'));
// });

router.post('/signup', validate(signupValidation), (req,res)=>{
  //const{ body:{ username, email, password, confirmPassword }}  = req;
  //console.log(username,email,password);
   res.json({succes: "signup validation is confirmed"})
});

// router.post('login', validate(loginValidation), (req,res)=>{
// res.json({succes: "login validation is confirmed"})
// })

// app.get("/userdetails", (req, res) => {

// });
// const getDetailsIndex = response => {
//   let data = [];
//   getDetails((err, users) => {
//     data.push(users);
//   });
// };
module.exports = router;
