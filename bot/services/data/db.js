const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "TONBOT",
    });
    console.log(`Mongoose connected: ${connection.connection.name}`);
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};
module.exports = connectDB;
