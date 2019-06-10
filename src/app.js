const express = require("express");
const path = require("path");
// const bodyParser = require("body-parser");
// const compression = require("compression");
const exphbs = require("express-handlebars");

// const controllers = require("./controllers/index");

const app = express();

app.set("view engine", "hbs");

app.engine(
  "hbs",
  exphbs({
    extname: "hbs",
    layoutsDir: path.join(__dirname, "views", "layouts"),
    defaultLayout: "main"
  })
);

// app.use(controllers);
app.disable("x-powered-by");

// app.use(compression());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'signing.html'));
});

app.get('/signbtn', (req, res)=> {
res.send('You already have an account');
});

app.get('/login', (req,res) => {
  res.render(path.join(__dirname, 'views', 'login.hbs'));
});

app.get('/login', (req,res) => {
  res.render(path.join(__dirname, 'views', 'login.hbs'));
});

app.get('/home', (req,res) => {
  res.render(path.join(__dirname, 'views', 'home.hbs'));
});

app.get('/details', (req,res) => {
  res.render(path.join(__dirname, 'views', 'details.hbs'));
});


// app.get("/", (req, res) => {
//   res.sendFile(__dirname, "..", "views", "signing.hbs");
//
// });




module.exports = app;
