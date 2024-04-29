const express = require("express");
const app = express();

const PORT = 8080;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");

dotenv.config();

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);

app.get("/", (req, res) => {
  res.send("Helcome..");
});

mongoose.connect(process.env.MONGO_URL, () => {
  console.log("mogoDB server is connected");
});

app.listen(PORT, () => {
  console.log(`The server ia run at http://localhost:${PORT}`);
});
