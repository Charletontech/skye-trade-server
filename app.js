const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./routes/router");
const initDB = require("./database/initDB");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());

//enabling cors
app.use(cors({ origin: true }));
// app.use(
//   cors({
//     origin: "https://hourglassnig.online",
//     credentials: true,
//   })
// );
// app.options("*", cors());

// initialize database
// initDB();

app.use("/", router);

module.exports = app;
