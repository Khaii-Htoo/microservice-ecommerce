import express from "express";
// import axios from "axios";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const host = process.env.HOST ?? "localhost";
const port = process.env.PORT ? Number(process.env.PORT) : 6001;

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    allowedHeaders: ["Authorization", "Content-Type"],
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(cookieParser());
app.set("trust proxt", 1);

app.get("/", (req, res) => {
  res.send({ message: "Hello API" });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
