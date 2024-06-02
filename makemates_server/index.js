import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import User from "./routes/User.js";
import Post from "./routes/Post.js";
import Search from "./routes/Search.js";
import cookieParser from "cookie-parser";
import { logger } from "./winston.js";
import dotenv from "dotenv";
import compression from "compression";
import helmet from "helmet";

const app = express();
dotenv.config();

app.use(
  cors({
    origin: ["https://makemates-2024.vercel.app", "http://localhost:3000"],
    credentials: true,
  })
);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(compression());
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
app.use("/user", User);
app.use("/posts", Post);
app.use("/search", Search);

const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
  logger.info(`Server listening on ${PORT}`);
});