const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const path = require("path");

const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");

  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );

  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");

  next();
});

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan("dev"));
require("./routes/payment.routes.js")(app);
const puerto = process.env.PORT;
app.listen(puerto);
console.log(`Server en el puerto ${puerto}`);
