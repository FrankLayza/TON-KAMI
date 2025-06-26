require("dotenv").config();
const connectDB = require("./services/data/db");
const { saveUser } = require("./services/userStore");
const Users = require("./schema/Users");
async function test() {
  await connectDB();
  const allUsers = await Users.find();
  const username = "testuser";
  const wallet = "EQD1a2b3c4d5e6f";
  await saveUser(username, wallet);
  console.log("👀 All users in DB:", allUsers);
  process.exit();
}

test();
