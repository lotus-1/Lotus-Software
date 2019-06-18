const express = require("express");
const router = express.Router();
const path = require("path");
const { postUsers, postInfo } = require("../database/queries/postDetails");
const { getPass, getInfo } = require("../database/queries/getDetails");
const { compare } = require("bcrypt");
const validate = require("../helpers/validate");
const { loginValidation, signupValidation } = require("../helpers/validation");
const hashPsw = require("../helpers/hashing");
const { createCookie } = require("../helpers/createJwt");


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
          }
        });
      }
    });
  }
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
      compare(req.body.psw, hashedPassword, (err, passMatch) => {
        if (err) console.log(err);
        if (!passMatch) {
          res.send("<h3> Passwords don't match ! </h3>");
        } else {
          console.log(req.body);
          createCookie(req.body.psw, (e, result) => {
            if (e) console.log(e);
            else {
              console.log(result);
              res.cookie("jwt", result, { maxAge: 900000, httpOnly: true });
              res.render(path.join(__dirname, "..", "views", "home"));
            }
          });
        }
      });
    }
  });
});

router.post("/logout", (req, res) => {
  let cookie = req.cookie;
  console.log("this is my cookie", cookie);
  res.clearCookie({ maxAge: 0, httpOnly: true });
  res.redirect("/login");
});

router.get("/details", (req, res) => {
  res.render(path.join(__dirname, "..", "views", "details"));
});

// router.post("/details", (req, res) => {
//   const { firstName, lastName, age, gender, email} = req.body;
//   console.log("this is the firsname:", firstName);
//   postInfo(firstName,lastName, age, gender, email, (err, res) => {
//      if (err) console.log("There is an error!:", err);
//         const conditions = (age, gender) => {
//           if (age > 18 && gender === "female") {
//           res.send('<h4> Congratulations you are accepted ! </h1>');
//         } else {
//           res.send('Sorry you have been not accepted !');
//         };
//        };
// });
// });
router.post("/details", (req, res) => {
  const { firstName, lastName, age, gender, email} = req.body;
  // const conditions = (age, gender) => {
    if (!(age > 18) || !(gender == "female")) {
      res.send('<h1>Sorry you have been not accepted !</h1>');
  } else {
    postInfo(firstName,lastName, age, gender, email, (err, result) => {
       if (err) console.log("There is an error!:", err);
       else {
         res.send('<h1> Congratulations you are accepted ! <br> We will send you an email! </h1>');
};
    });
  }
// };
});



router.get("/userdetails", (req, res) => {
  getPass((error, response) => {
    if (error) return error;
    res.json(response);
  });
});

router.get("*", (req, res) => {
  res.render(path.join(__dirname, "..", "views", "error"));
});

module.exports = router;
