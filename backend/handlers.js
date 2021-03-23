"use strict";
const { MongoClient, ObjectID, ObjectId, ReplSet } = require("mongodb");
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
          ? res.status(200).json({
              status: 200,
              data: { id: result._id, ...result.userProfile },
            })
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

const assignShifts = async (req, res) => {
  const response = req.body;
  const id = response.empid;
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();
  let x = ObjectID();

  try {
    const db = client.db("employee_system");
    await db.collection("all_shifts").insertOne(response);
    await db.collection("employee_data").updateOne(
      { _id: id },
      {
        $push: {
          "userProfile.shifts": {
            _id: x,
            startTime: response.startTime,
            endTime: response.endTime,
            title: response.title,
          },
        },
      }
    );
    res
      .status(200)
      .json({ status: 200, message: "Shifts added", data: response });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
};

const getAllShifts = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();
  try {
    const db = client.db("employee_system");
    await db
      .collection("employee_data")
      .find({})
      .toArray((err, result) => {
        result
          ? res.status(200).json({
              status: 200,
              data: result.map((elem) => {
                return { id: elem._id, userProfile: elem.userProfile };
              }),
            })
          : console.log(err);
        // console.log(result);
        client.close();
      });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, message: err.message });
  }
};

const updateShift = async (req, res) => {
  const response = req.body;
  const id = response.id;
  const shiftID = response.newshift.id;
  console.log(typeof shiftID);
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();

  try {
    const db = client.db("employee_system");
    await db.collection("employee_data").updateOne(
      {
        "userProfile.shifts": {
          $elemMatch: { _id: ObjectId(shiftID) },
        },
      },
      {
        $set: {
          "userProfile.shifts.$.startTime": response.newshift.startTime,
          "userProfile.shifts.$.endTime": response.newshift.endTime,
        },
      },
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).json({ error: "Unable to update shifts." });
          client.close();
        } else {
          console.log(result);
          res.status(200).json({
            status: 200,
            message: "Shifts updated successfully",
            data: response,
          });
          client.close();
        }
      }
    );
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, message: err.message });
  }
};

const cancelUserShift = async (req, res) => {
  const response = req.body;
  console.log(response);
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();
  const cancelledObj = {
    ...response,
    _id: ObjectId(response._id),
  };
  try {
    const db = client.db("employee_system");
    await db.collection("cancelled_shifts").insertOne(cancelledObj);
    await db.collection("employee_data").updateOne(
      {
        "userProfile.shifts": {
          $elemMatch: { _id: ObjectId(response._id) },
        },
      },
      {
        $pull: {
          "userProfile.shifts": { startTime: response.startTime },
        },
      },
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).json({ error: "Shift not found" });
        } else {
          console.log(result);
          res.status(200).json({
            status: 200,
            message: "shift Found",
            data: result,
          });
          client.close();
        }
      }
    );
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, message: err.message });
  }
};

const deleteUserShift = async (req, res) => {
  const response = req.body;
  console.log(response);
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();

  try {
    const db = client.db("employee_system");
    await db.collection("employee_data").updateOne(
      {
        "userProfile.shifts": {
          $elemMatch: { _id: ObjectId(response._id) },
        },
      },
      {
        $pull: {
          "userProfile.shifts": { startTime: response.startTime },
        },
      },
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).json({ error: "Shift not found" });
        } else {
          console.log(result);
          res.status(200).json({
            status: 200,
            message: "shift Found",
            data: result,
          });
          client.close();
        }
      }
    );
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, message: err.message });
  }
};

const retireUser = async (req, res) => {
  const response = req.body;
  console.log(response);
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();

  try {
    const db = client.db("employee_system");
    await db.collection("all_employees").updateOne(
      {
        _id: response._id,
      },
      {
        $set: {
          currentStatus: "Retired",
        },
      },
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).json({ error: "User not found." });
        } else {
          console.log(result);
          res.status(200).json({
            status: 200,
            message: "User updated.",
            data: result,
          });
          client.close();
        }
      }
    );
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, message: err.message });
  }
};

const archiveUser = async (req, res) => {
  const response = req.body;
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();

  try {
    const db = client.db("employee_system");
    const archiveEmployee = await db
      .collection("employee_data")
      .findOne({ _id: response._id });
    await db
      .collection("all_employees")
      .updateOne(
        { _id: response._id },
        { $set: { currentStatus: "Archived" } }
      );
    await db.collection("archived_employees").insertOne(archiveEmployee);
    await db.collection("employee_data").deleteOne({ _id: response._id });

    res.status(200).json({ status: 200, message: "Employee Archived." });
    console.log(archiveEmployee);
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, message: err.message });
  }
};

const getUserShifts = async (req, res) => {
  const id = req.params.id;
  const client = await MongoClient(MONGO_URI, options);
  await client.connect();
  try {
    const db = client.db("employee_system");
    await db.collection("employee_data").findOne({ _id: id }, (err, result) => {
      result
        ? res.status(200).json({
            status: 200,
            data: result.userProfile.shifts,
          })
        : console.log(err);
      // console.log(result);
      client.close();
    });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, message: err.message });
  }
};

const getCancelledShifts = async (req, res) => {
  res.status(200);
};

module.exports = {
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
};
