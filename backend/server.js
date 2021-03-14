"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const {
  handleAdminLogin,
  handleUserLogin,
  getEmployeeList,
  AddNewEmployee,
} = require("./handlers");

const PORT = 8000;

express()
  .use(morgan("tiny"))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(express.static("public"))

  // REST endpoints:

  .post("/adminlogin", handleAdminLogin)
  .post("/userlogin", handleUserLogin)
  .get("/employee-list", getEmployeeList)
  .post("/add-new-employee", AddNewEmployee)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
