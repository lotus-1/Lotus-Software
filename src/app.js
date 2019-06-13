const express = require("express");
const path = require("path");
const body = require("body-parser");
// const compression = require("compression");
const exphbs = require("express-handlebars");
const router = require("./controllers/router");
const routerAuth = require('./controllers/routerAuth');
require('dotenv').config();

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
app.use(body.json());
app.use(body.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(router);
app.use(routerAuth);

module.exports = app;
