"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const { handleAdminLogin } = require("./handlers");

const PORT = 8000;

express()
  .use(morgan("tiny"))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(express.static("public"))

  // REST endpoints:

  .post("/adminlogin", handleAdminLogin)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
