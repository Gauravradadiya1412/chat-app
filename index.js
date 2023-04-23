const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config()

//import routes
const userRoutes = require("./routes/userRoutes")

//dbConnection
require("./service/dbConnection");

//import model
const User = require("./models/user");
const app = express()
app.use(bodyParser.json())
//routes
app.use("/api/users", userRoutes)
app.use(cors());

User.sync()
  .then(() => {
    console.log("User table created successfully.");
  })
  .catch((error) => {
    console.error("Error creating User table: ", error);
  });

app.listen(3000, () => {
    console.log('Server started on port 3000!');
  });