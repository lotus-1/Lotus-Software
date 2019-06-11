const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
// const compression = require("compression");
const exphbs = require("express-handlebars");
const router = require("./controllers/router");

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

app.disable("x-powered-by");

// app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(router);


module.exports = app;
