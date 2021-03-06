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
  getUserProfile,
  updateContactInfo,
  updatePassword,
  sendEmails,
  getArchivedUsers,
  updateUserEmail,
  updateAdminPassowrd,
  getRetiredUser,
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
  .get("/get-user-details/:id", getUserProfile)
  .put("/update-contact-info", updateContactInfo)
  .put("/update-password", updatePassword)
  .put("/update-user-email", updateUserEmail)
  .post("/send-emails", sendEmails)
  .get("/get-archived-user/:id", getArchivedUsers)
  .get("/get-retired-user/:id", getRetiredUser)
  .put("/update-admin-password", updateAdminPassowrd)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
