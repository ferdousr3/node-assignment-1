const fsPromises = require("fs").promises;
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const { saveNewUser, getUserData } = require("../middleware/user");
const user = require("../data/data.json");
const users = require("../data/user.json");

// get one  random user
const getUserRandom = async (req, res) => {
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, "../data", "data.json"),
      "utf8"
    );
    const newData = await JSON.parse(data);
    const allData = newData.sort(() => 0.5 - Math.random());
    const randomData = allData.slice(0, 1);
    res.status(200).json(randomData);
  } catch (err) {
    res.status(500).send(error.message);
  }
};

// get all users
const getAllUsers = async (req, res) => {
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, "../data", "data.json"),
      "utf8"
    );
    const newsData = await JSON.parse(data);
    res.status(200).json(newsData);
  } catch (err) {
    res.status(500).send(error.message);
  }
};



// save a user
const saveUser = async (req, res) => {
  try {
    const existUsers = getUserData();
    //get the new user
    const userData = req.body;
    //check if the user fields are missing
    if (
      userData.id == null ||
      userData.gender == null ||
      userData.name == null ||
      userData.contact == null ||
      userData.address == null ||
      userData.photoUrl == null
    ) {
      return res
        .status(401)
        .send({ error: true, msg: "User Filed are missing" });
    }

    //check if the user id exist already
    const findExist = existUsers.find((user) => user.id === userData.id);
    if (findExist) {
      return res
        .status(409)
        .send({ error: true, msg: "user id already exist" });
    }
    //append the user data
    existUsers.push(userData);
    //save the new user data
    saveNewUser(existUsers);
    res.send({ success: true, msg: "New User  added successfully" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = { getAllUsers, getUserRandom, saveUser };
