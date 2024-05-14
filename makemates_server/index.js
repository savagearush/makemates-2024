import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import User from "./routes/User.js";
import Post from "./routes/Post.js";
import Search from "./routes/Search.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import auth from "./middleware/auth.js";
const app = express();
dotenv.config();
import db from "./db/db.js";

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
app.use("/user", User);
app.use("/posts", Post);
app.use("/search", Search);

app.get("/check", auth, (req, res) => {
  res.send("Check Pass");
});

const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
