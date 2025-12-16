import express from "express";
// import axios from "axios";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    allowedHeaders: ["Authorization", "Content-Type"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send({ message: "Hello API" });
});

const port = process.env.PORT || 8001;
const server = app.listen(port, () => {
  console.log(`Auth server is running at https://localhost:${port}`);
});

server.on("error", (err) => {
  console.log("Server Error:", err);
});
