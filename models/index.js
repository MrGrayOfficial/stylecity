const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const uri = process.env.URI;

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Database connected successfully!");
  } catch (error) {
    console.log(`Error: Database not connected! ${error}`);
  }
};

connectDB();

mongoose.set("debug",true);

module.exports.Users = require("./user");
module.exports.Products = require("./product");