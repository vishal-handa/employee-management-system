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
        console.log(result);
        client.close();
      });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = {
  handleAdminLogin,
  handleUserLogin,
  getEmployeeList,
};
