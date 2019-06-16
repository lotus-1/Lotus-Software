const express = require("express");
const router = express.Router();
const path = require("path");
const { postUsers, postInfo } = require("../database/queries/postDetails");
const getUsers = require("../database/queries/getDetails");

// const postInfo = require("../database/queries/postDetails");
const validate = require("../helpers/validate");
const { loginValidation, signupValidation } = require("../helpers/validation");
const hashPsw = require("../helpers/hashing");
const createCookie = require("../helpers/createJwt");

// router.get("/userdeemail=mahaforo276%40gmail.com&psw=511tails", getDetails);

// router.post("/userdetails", postDetails);

router.get("/", (req, res) => {
  res.render(path.join(__dirname, "..", "views", "register"));
});

router.post("/register", validate(signupValidation), (req, res) => {
  const { username, email, password, confirmPsw } = req.body;
  if (password != confirmPsw) {
    res.send("Passwords do not match.");
  } else {
    hashPsw(password, (error, hashedPas) => {
      if (error) {
        console.log(error);
      } else {
        postUsers(username, email, hashedPas, (err, result) => {
          if (err) {
            console.log(err);
          }
          res.render(path.join(__dirname, "..", "views", "message"));
          // res.render({
          //   user: `Hello, ${username}`
          // })
        })
      }


    })
  }
});

router.get("/login", (req, res) => {
  res.render(path.join(__dirname, "..", "views", "login"));
});


router.post("/login", validate(loginValidation), (req, res) => {
  const { email, password } = req.body;
  getUsers(email, password)
  console.log('this is password login: ', password);
  createCookie({ email, password }, (err, result) => {
    if (err) console.log(err);
    else {
      console.log(result);
      res.cookie("jwt", result);
      res.redirect('/home');
    }
  })
});

router.get("/details", (req, res) => {
  res.render(path.join(__dirname, "..", "views", "details"));
});

// router.post("/details", (req, res) => {
// }

router.get("/userdetails", (req, res) => {
  getUsers.getUsers((error, response) => {
    if (error) return error;
    res.json(response);
  })
});

module.exports = router;
