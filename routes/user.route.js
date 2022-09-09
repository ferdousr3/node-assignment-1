const express = require("express");
const {
  getAllUsers,
  getUserRandom,
  saveUser,
  deleteUser,
  updateUser,
  bulkUpdate,
} = require("../controllers/user.controller");
const router = express.Router();
const bodyParser = require("body-parser");

router.get("/random", getUserRandom);
router.get("/all", getAllUsers);
router.post("/save", bodyParser.json(), saveUser);
router.patch("/update", bodyParser.json(), updateUser);
router.patch("/bulk-update", bodyParser.json(), bulkUpdate);
router.delete("/delete", bodyParser.json(), deleteUser);

module.exports = router;
