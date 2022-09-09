const fsPromises = require("fs").promises;
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const { saveNewUser, getUserData } = require("../utility/user");
const user = require("../data/data.json");

// get a random user
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
    const newData = await JSON.parse(data);
    const randomUsers = newData.sort(() => 0.5 - Math.random());
    res.status(200).json(randomUsers);
  } catch (err) {
    res.status(500).send(err.message);
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

// update a user
const updateUser = async (req, res) => {
  try {
    const userId = req.body.id;
    //get the update data
    const userData = req.body;
    //get the existing user
    const existUsers = getUserData();
    //check if the user id is missing
    if (userId == null) {
      return res.status(401).send({ error: true, msg: "User Id is missing" });
    }
    //check if the user id exist or not
    const findExist = existUsers.find((user) => user.id === userId);
    if (!findExist) {
      return res.status(409).send({ error: true, msg: "user id not exist" });
    }

    //filter the user to remove it
    const updateUser = existUsers.filter((user) => user.id !== userId);
    //push the updated data
    updateUser.push(userData);
    //save the filtered
    saveNewUser(updateUser);
    res.send({ success: true, msg: "User update successfully" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// update multiple  user
const bulkUpdate = async (req, res) => {
  try {
    const userId = req.body.map((item) => item.id);
    //get the update data
    const userData = req.body;
    //get the existing user
    const existUsers = getUserData();
    //check if the user id is missing
  //  const missingFiled = userData.filter((x) => !existUsers.includes(x));
  //  const isSameUser = (missingFiled, userData) =>
  //    userData.value === existUsers.value &&
  //    existUsers.name === userData.name;

  //   console.log('missing',missingFiled);
  //   if (missingFiled == null) {
  //     return res.status(401).send({ error: true, msg: "User Id is missing" });
  //   }
    //check if the user id exist or not

    const keys = existUsers.map((user) => user.id);
    const isExist = userId.every((id) => keys.includes(id));

    if (isExist === false) {
      return res.status(409).send({ error: true, msg: "user id not exist" });
    }

    const updatedUser = existUsers.map(
      (user) => userData.find((item) => item.id === user.id) || user
    );
    

    //push the updated data

    saveNewUser(updatedUser);
    res.send({ success: true, msg: "User update successfully" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// delete a user
const deleteUser = async (req, res) => {
  try {
    const userId = req.body.id;
    console.log(userId);
    //get the existing user
    const existUsers = getUserData();
    //check if the user id is missing
    if (userId == null) {
      return res.status(401).send({ error: true, msg: "User Id is missing" });
    }
    //filter the user to remove it
    const filterUser = existUsers.filter((user) => user.id !== userId);
    if (existUsers.length === filterUser.length) {
      return res
        .status(409)
        .send({ error: true, msg: "user id does not exist" });
    }
    //save the filtered
    saveNewUser(filterUser);
    res.send({ success: true, msg: "User removed successfully" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  getAllUsers,
  getUserRandom,
  saveUser,
  updateUser,
  bulkUpdate,
  deleteUser,
};
