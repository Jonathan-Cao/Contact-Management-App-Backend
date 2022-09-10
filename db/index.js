// Import Mongoose
let mongoose = require("mongoose");
require("dotenv").config();
// Import MongoMemoryServer
let MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;

async function connect() {
  // Connect to Mongoose and set connection variable
  if (process.env.NODE_ENV === "test") {
    console.log("connecting to mock db");
    const mongod = await MongoMemoryServer.create({
      binary: { version: "4.2.6" },
    });
    const uri = mongod.getUri();
    mongoose.connect(uri);
  } else {
    mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/b1", {
      useNewUrlParser: true,
    });
  }
  var db = mongoose.connection;

  // Added check for DB connection
  if (!db) console.log("Error connecting db");
  else console.log("Db connected successfully");
}

function close() {
  return mongoose.disconnect();
}

module.exports = { connect, close };
