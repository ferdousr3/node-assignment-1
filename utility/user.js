const path = require("path");
const fs = require("fs");

//read the user
const saveNewUser = (data) => {
  const stringifyData = JSON.stringify(data);
  fs.writeFileSync(path.join(__dirname, "../data", "data.json"), stringifyData);
};
//get the user
const getUserData = () => {
  const jsonData = fs.readFileSync(
    path.join(__dirname, "../data", "data.json")
  );
  return JSON.parse(jsonData);
};

// check number
const isNumeric = (num) => {
  return !isNaN(num);
};

module.exports = { saveNewUser, getUserData, isNumeric };
