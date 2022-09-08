
// save a user
const saveUser = async (req, res) => {
  try {
    // const user = {
    //   id: req.id,
    //   gender: req.gender,
    //   name: req.name,
    //   contact: req.contact,
    //   address: req.address,
    //   photoUrl: req.photoUrl,
    // };
    // const newData = JSON.stringify(user);
    // console.log(user.id);
    // const data = await fsPromises.writeFile(
    //   path.join(__dirname, "../data", "user.json"),newData
    // );
    users.push(req.body);

    const save = () => {
      fs.writeFile(
        path.join(__dirname, "../data", "user.json"),
        JSON.stringify(users, null, 2),
        (error) => {
          if (error) {
            res.send(error.message);
          }
        }
      );
    };
    res.json({
      status: "success",
      stateInfo: req.body,
    });
    // const addData = data.push(newData);
    // const newsData = await JSON.parse(data);
    // res.send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
};