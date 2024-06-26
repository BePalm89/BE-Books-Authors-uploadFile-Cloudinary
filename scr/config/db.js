const moongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await moongoose.connect(process.env.DB_URL);
    console.log("Connection to DB was succefull");
  } catch (error) {
    console.log("Error connecting to DB");
  }
};

module.exports = { connectDB };