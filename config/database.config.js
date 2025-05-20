const mongoose = require("mongoose");

const dbconnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(
      "-- DataBase Connect Successfully --"
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbconnect;
