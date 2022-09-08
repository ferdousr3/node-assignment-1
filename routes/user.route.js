const express = require("express");
const { getAllUsers, getUserRandom, saveUser } = require("../controllers/user.controller");
const router = express.Router();
const bodyParser = require("body-parser");

router.get("/random", getUserRandom);
router.get("/all", getAllUsers);
router.post("/save", bodyParser.json(), saveUser);


module.exports = router;
