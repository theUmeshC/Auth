const bcrypt = require("bcrypt");

const { createTokens } = require("../JWT/JWT.js");
const Users = require("../Models/UsersAuth.js");

const registerUser = (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username,
      password: hash,
    })
      .then(() => {
        res.json("User Registered");
      })
      .catch((error) => {
        if (error) {
          res.status(400).json({ error: error });
        }
      });
  });
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });

  if (!user) res.status(400).json({ error: "User Doesn't Exist" });

  const dbPassword = user.password;
  bcrypt.compare(password, dbPassword).then((match) => {
    if (!match) {
      res
        .status(400)
        .json({ error: "Wrong Username and Password Combination!" });
    } else {
      const accessToken = createTokens(user);

      res.cookie("access-token", accessToken, {
        maxAge: 60 * 60 * 24 * 30 * 1000,
        httpOnly: true,
      });
      res.json("LOGGED IN");
    }
  });
};

module.exports = { registerUser, loginUser };
