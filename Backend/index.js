require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const sequelize = require("./utils/UserDatabase.js");
const authRouter = require("./Routes/Auth.js");

const port = process.env.PORT || "8000";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  })
);

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());

app.use("/auth", authRouter);

sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log("listening to port ");
    });
  })
  .catch((err) => {
    console.log(err);
  });
