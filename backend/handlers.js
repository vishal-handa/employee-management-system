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
  console.log(userName, password);
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("employee_system");
    await db
      .collection("admin_credentials")
      .findOne({ userName, password }, (err, result) => {
        result
          ? res.status(200).json({ status: 200, data: result.userName })
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

module.exports = {
  handleAdminLogin,
};
