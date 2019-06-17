const express = require("express");
const router = express.Router();
const path = require("path");
const { postUsers, postInfo } = require("../database/queries/postDetails");
const { getPass, getInfo } = require("../database/queries/getDetails");
// const postInfo = require("../database/queries/postDetails");
const validate = require("../helpers/validate");
const { loginValidation, signupValidation } = require("../helpers/validation");
const hashPsw = require("../helpers/hashing");
const createCookie = require("../helpers/createJwt");
// const conditions = require("../helpers/details");
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
          } else {
          res.render(path.join(__dirname, "..", "views", "message"));
          // res.render({
          //   user: `Hello, ${username}`
          // })
        }
        })
      }
    });
  }
});

router.get("/userdetails", (req, res) => {
  getPass((error, response) => {
    if (error) return error;
    res.json(response);
  })
});

router.get("/login", (req, res) => {
  res.render(path.join(__dirname, "..", "views", "login"));
});

router.post("/login", validate(loginValidation), (req, res) => {
  const { email, password } = req.body;

  getPass(email, (error, hashedPassword) => {
    console.log('this is the hashedPassword:', hashedPassword);
    if (error) res.send("Username or password is not correct !");
    if (!hashedPassword) {
      res.send("<h3> No user found !</h3>");
    } else {
      compare(password, hashedPassword, (err, passMatch) => {
        if (err) console.log(err);
        if (!passMatch) {
          res.send("<h3> Password don't match ! </h3>");
        } else {
          createCookie({ email, password }, (e, result) => {
            if (e) console.log(e);
            else {
              console.log(result);
              res.cookie("jwt", result);
            }
          });
        }
      });
    }
  });
  // res.redirect("/home");

  res.render(path.join(__dirname, "..", "views", "home"));

});

router.get("/details", (req, res) => {
res.render(path.join(__dirname, "..", "views", "details"));
});

router.post("/details", (req, res) => {
  postInfo(first_name, last_name, age, gender, high_learning, email, (err, res) => {
     if (err) console.log("There is an error!");
     else {
        const conditions = (age, gender, learning) => {
          if (age > 18 && gender === "female" && learning === "yes") {
          res.send('<h4> Congratulations you are accepted ! </h1>')
        } else {

          res.send('Sorry you have not been accepted !')
         }
       }}

    })
  });

router.post('/logout', (req, res) => {
  let cookie = req.cookie;
  console.log('this is my cookie', cookie);
  let cookieKey = Object.keys(cookie);
    res.clearCookie(`${cookieKey[0]}`, { maxAge:0, httpOnly: true});
    res.redirect('/');
  });




module.exports = router;
