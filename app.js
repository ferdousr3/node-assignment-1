const express = require("express");
const cors = require("cors");

const userRoute = require("./routes/user.route");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));

// all users route
app.use("/user", userRoute);

// main route
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

//route is found
app.use((req, res) => {
  res.status(404).json({
    message: "route is not found",
  });
});

// server is not found
app.use((err, req, res) => {
  res.status(500).json({
    message: "server is not found",
  });
});

module.exports = app;
