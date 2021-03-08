"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const { handleAdminLogin, handleUserLogin } = require("./handlers");

const PORT = 8000;

express()
  .use(morgan("tiny"))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(express.static("public"))

  // REST endpoints:

  .post("/adminlogin", handleAdminLogin)
  .post("/userlogin", handleUserLogin)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
