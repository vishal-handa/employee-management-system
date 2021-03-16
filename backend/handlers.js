"use strict";
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const handleAdminLogin = async (req, res) => {
  const { userName, password } = req.body;
  // console.log(userName, password);
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("employee_system");
    await db
      .collection("admin_credentials")
      .findOne({ userName, password }, (err, result) => {
        result
          ? res.status(200).json({ status: 200, data: result.userProfile })
          : res
              .status(404)
              .json({ status: 404, data: "Not Found", error: err });

        client.close();
        console.log("disconnected!");
      });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, message: err.message });
  }
};

const handleUserLogin = async (req, res) => {
  const { _id, password } = req.body;
  // console.log(_id, password);
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("employee_system");
    await db
      .collection("employee_data")
      .findOne({ _id, password }, (err, result) => {
        result
          ? res.status(200).json({ status: 200, data: result.userProfile })
          : res
              .status(404)
              .json({ status: 404, data: "Not Found", error: err });

        client.close();
        console.log("disconnected!");
      });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, message: err.message });
  }
};

const getEmployeeList = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();
  try {
    const db = client.db("employee_system");
    await db
      .collection("all_employees")
      .find({})
      .toArray((err, result) => {
        result
          ? res.status(200).json({ status: 200, data: result })
          : console.log(err);
        // console.log(result);
        client.close();
      });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, message: err.message });
  }
};

const AddNewEmployee = async (req, res) => {
  const response = req.body;
  const _id = response._id;
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();
  try {
    const db = client.db("employee_system");
    const empCheck = await db.collection("all_employees").findOne({ _id });
    if (empCheck) {
      res.status(406).json({
        status: 406,
        message: "Employee ID already exists. Please provide a new one.",
      });
    } else {
      await db.collection("all_employees").insertOne({
        ...response,
        currentStatus: "Active",
        joinDate: Date.now().toString(),
      });
      await db.collection("employee_data").insertOne({
        _id,
        password: "",
        userProfile: {
          fname: response.fname,
          lname: response.lname,
          shifts: [],
        },
      });
      res.status(200).json({ status: 200, Message: "Employee Added" });
    }
    client.close();
    console.log(empCheck);
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, message: err.message });
  }
};

const registerNewUser = async (req, res) => {
  const response = req.body;
  const _id = response._id;
  const fname = response.fname;
  const lname = response.lname;
  const email = response.email;
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();
  try {
    const db = client.db("employee_system");
    const empCheck = await db
      .collection("all_employees")
      .findOne({ _id, fname, lname, email });
    if (empCheck) {
      await db.collection("employee_data").insertOne({
        _id,
        password: response.password,
        userProfile: {
          fname: response.fname,
          lname: response.lname,
          shifts: [],
        },
      });
      res.status(200).json({ status: 200, Message: "Employee Added" });
    } else {
      res.status(406).json({
        status: 406,
        message:
          "Employee details don't exist in the system. Please contact the administrator.",
      });
    }
    client.close();
    console.log(empCheck);
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = {
  handleAdminLogin,
  handleUserLogin,
  getEmployeeList,
  AddNewEmployee,
  registerNewUser,
};
