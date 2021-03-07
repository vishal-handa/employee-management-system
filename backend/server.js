"use strict";

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

express()
  .use(morgan("tiny"))
  .use(bodyParser.json())

  .use(express.static("public"))

  // .get()

  .listen(8000, () => console.log(`Listening on port 8000`));
