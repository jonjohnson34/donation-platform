const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const userRoutes = require('./routes/user');


// MONGO ATLAS PROD
// mongoose.connect("mongodb+srv://" + process.env.MONGO_ATLAS_USER + ":" + process.env.MONGO_ATLAS_PASS + "@burbz-mjz62.mongodb.net/burbz-main", { useNewUrlParser: true })
// MONGO ATLAS TEST
 mongoose.connect("mongodb+srv://donorUser:xdKcRpTBbSRMPS3k@cluster0-cyswv.mongodb.net/donationPlatform", { useNewUrlParser: true })
.then(() => {
  console.log("Connected to DataBase");
})
.catch((err) => {
  console.log(err);
  console.log("Connection failed");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization", // Authorization is a custom header
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use('/api/user', userRoutes);


module.exports = app;
