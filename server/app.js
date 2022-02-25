const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Database connection
require("./db/connection");

//------------------------------------ import routes here---------------------//
const profileRoutes = require("./routes/profileRoutes.js");
//-----------------------------------

//-------------------User routes ---------------//
app.use(profileRoutes);

// 404 api
app.use((req, res) => {
  res.status(404).json({ error: "Page not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong" } = err;
  res.status(status).json({ error: message });
});

// server port
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`running on ${port}`);
});
