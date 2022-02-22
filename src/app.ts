import "dotenv/config";
import express from "express";
import helmet from "helmet";
import compression from "compression";
import { limiter, slower } from "@middlewares/rateLimit";
import cors from "cors";
import { HandleError } from "./middlewares/HandleError";
import fs from "fs";
import path from "path";
import morgan from "morgan";
import { dateoptions } from "./helpers/Morgan";
import { generate } from "./helpers/GenerateLogsFolder";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(HandleError);

const corsOptions = {
  origin: "*",
  credentials: true,
};

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(compression());
app.use(helmet());
app.disable("x-powered-by");
app.use(cookieParser());
app.use(limiter);
app.use(slower);
app.use(cors(corsOptions));
generate();

app.use(
  morgan(
    `:method :url :response-time ms\nDATE: ${new Date().toLocaleDateString(
      "en-US",
      dateoptions
    )}\nHTTP STATUS CODE: :status\n`,
    {
      stream: fs.createWriteStream(path.join(__dirname, "logs/Requests.log"), {
        flags: "a",
      }),
    }
  )
);

export default app;
