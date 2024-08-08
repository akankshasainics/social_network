const mongoose = require("mongoose");
const {MONGO_CONNECTION} = require("./constant");

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_CONNECTION);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {connectDB};
