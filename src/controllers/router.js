const express = require("express");
const router = express.Router();
const path = require("path");
const { postUsers, postInfo } = require("../database/queries/postDetails");
const { getPass, getInfo } = require("../database/queries/getDetails");
// const postInfo = require("../database/queries/postDetails");
const { compare } = require("bcrypt");
const validate = require("../helpers/validate");
const { loginValidation, signupValidation } = require("../helpers/validation");
const hashPsw = require("../helpers/hashing");
const createCookie = require("../helpers/createJwt");
const conditions = require("../helpers/details");
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
        });
      }
    });
  }
});

router.get("/userdetails", (req, res) => {
  getPass((error, response) => {
    if (error) return error;
    res.json(response);
  });
});

router.get("/login", (req, res) => {
  res.render(path.join(__dirname, "..", "views", "login"));
});

router.post("/login", validate(loginValidation), (req, res) => {
  getPass(req.body.username, (error, hashedPassword) => {
    console.log("this is the hashedPassword:", hashedPassword);
    if (error) res.send("Username or password is not correct !");
    if (!hashedPassword) {
      res.send("<h3> No user found !</h3>");
    } else {
      compare(req.body.password, hashedPassword, (err, passMatch) => {
        if (err) console.log(err);
        if (!passMatch) {
          res.send("<h3> Passwords don't match ! </h3>");
        } else {
          console.log(req.body);
          createCookie(req.body.username, req.body.password, (e, result) => {
            if (e) console.log(e);
            else {
              console.log(result);
              res.cookie("jwt", result);
              res.render(path.join(__dirname, "..", "views", "home"));
            }
          });
        }
      });
    }
  });
  // res.redirect("/home");
});

router.get("/details", (req, res) => {
  res.render(path.join(__dirname, "..", "views", "details"));
});

// router.post("/details", (req, res) => {
// }

module.exports = router;
