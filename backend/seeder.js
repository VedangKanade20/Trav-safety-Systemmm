import dotenv from "dotenv";
import connectDB from "./config/db.js";

import users from "./data/users.js";

import User from "./models/userModel.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // Delete existing data to avoid duplication

    await User.deleteMany();

    // Insert user data get their ids
    const createdUsers = await User.insertMany(users);

    // Create a map of user email to user ID
    const userMap = createdUsers.reduce((map, user) => {
      map[user.email] = user._id;
      return map;
    }, {});

    console.log("Data imported successfully");
    process.exit();
  } catch (err) {
    console.error(`${err}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // Delete all user data

    await User.deleteMany();

    console.log("Data destroyed");
    process.exit();
  } catch (err) {
    console.error(`${err}`);
    process.exit(1);
  }
};

// Check command line argument to determine whether to destroy or import data
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
