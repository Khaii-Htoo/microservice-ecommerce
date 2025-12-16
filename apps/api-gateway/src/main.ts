import cookieParser from "cookie-parser";
import express from "express";
import rateLimit, { ipKeyGenerator } from "express-rate-limit";
import morgan from "morgan";
import proxy from "express-http-proxy";
import * as path from "path";

const app = express();

app.use("/assets", express.static(path.join(__dirname, "assets")));

app.use(morgan("dev"));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(cookieParser());
app.set("trust proxt", 1);

const limiter = rateLimit({
  windowMs: 16 * 60 * 1000,
  max: (req: any) => (req.user ? 1000 : 100),
  message: { error: "Too many request , pleasse try again later" },
  standardHeaders: true,
  keyGenerator: (req: any) => {
    return ipKeyGenerator(req.ip);
  },
});

app.use(limiter);

app.get("/gateway-health", (req, res) => {
  res.send({ message: "Welcome to api-gateway!" });
});
app.get("/", proxy("http://localhost:6001"));

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on("error", console.error);
