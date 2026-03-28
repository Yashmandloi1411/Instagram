const mongoose = require("mongoose");
require("dotenv").config();
async function connectToDB() {
  await mongoose.connect(process.env.DATABASE_URI).then(() => {
    console.log("Connecting to DB");
  });
}

module.exports = connectToDB;
