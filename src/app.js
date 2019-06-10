const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const compression = require("compression");
const exphbs = require("express-handlebars");

const controllers = require("./controllers/index");

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


// app.disable("x-powered-by");

// app.use(compression());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  express.static(path.join(__dirname, "..", "public"), { maxAge: "30d" })
);

// app.get("/", (req, res) => {
//   res.sendFile(__dirname, "..", "views", "signing.hbs");
//
// });
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "..", "views", "signing.hbs"));
// });


// app.use(controllers);
module.exports = app;
