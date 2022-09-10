// Import express
let express = require("express");
// Import Body parser
let bodyParser = require("body-parser");
// Import db
let db = require("./db/index.js");
// Import cors
let cors = require("cors");
// Initialise the app
let app = express();

// Import routes
let apiRoutes = require("./api-routes");
// Configure bodyparser to handle post requests
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
// Configure cors
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
// Connect to db
db.connect();

// Setup server port
var port = process.env.PORT || 8080;

// Send message for default URL
app.get("/", (req, res) => res.send("Hello World with Express"));

// Use Api routes in the App
app.use("/api", apiRoutes);
// Launch app to listen to specified port
app.listen(port, function () {
  console.log("Running Contact Management API on port " + port);
});

module.exports = app;
