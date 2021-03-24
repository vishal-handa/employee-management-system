"use strict";

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const {
  handleAdminLogin,
  handleUserLogin,
  getEmployeeList,
  AddNewEmployee,
  registerNewUser,
  assignShifts,
  getAllShifts,
  updateShift,
  cancelUserShift,
  deleteUserShift,
  retireUser,
  archiveUser,
  getUserShifts,
  getCancelledShifts,
  takeCancelledShifts,
} = require("./handlers");

const PORT = 8000;

express()
  .use(morgan("tiny"))
  .use(express.static("public"))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))

  // REST endpoints:

  .post("/adminlogin", handleAdminLogin)
  .post("/userlogin", handleUserLogin)
  .get("/employee-list", getEmployeeList)
  .post("/add-new-employee", AddNewEmployee)
  .post("/register-user", registerNewUser)
  .put("/retire-user", retireUser)
  .put("/archive-user", archiveUser)
  .post("/assign-shifts", assignShifts)
  .get("/get-all-shifts", getAllShifts)
  .put("/update-user-shift", updateShift)
  .post("/cancel-user-shift", cancelUserShift)
  .delete("/delete-user-shift", deleteUserShift)
  .get("/get-user-shifts/:id", getUserShifts)
  .get("/get-cancelled-shifts", getCancelledShifts)
  .post("/take-cancelled-shift", takeCancelledShifts)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
