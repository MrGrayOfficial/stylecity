const mongoose = require("mongoose");

// const uri =
//   "mongodb+srv://akashstyle:akashstyle@cluster0.94yj86i.mongodb.net/?retryWrites=true&w=majority";

const uri = `mongodb+srv://akashstyle:akashstyle@cluster0.94yj86i.mongodb.net/`;

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