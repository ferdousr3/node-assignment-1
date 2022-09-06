const fsPromises = require("fs").promises;
const path = require("path");

const getAllUsers = async (req, res) => {
  try{
    const data = await fsPromises.readFile(path.join(__dirname,'../data','data.json'), "utf8")
    const newsData = await JSON.parse(data);
    res.status(200).json(newsData);
  }catch(err){
    res.status(500).send(error.message);
  }
};

module.exports = { getAllUsers };
