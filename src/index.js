import express from "express";
const app = express();

import { HomeRoute } from "./routes/home.route.js";
app.use("/", HomeRoute);


app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const responseTime = Date.now() - start;
    const contentLength = res.get("Content-Length");
    console.log({
      method: req.method,
      url: req.originalUrl,
      query: req.query,
      responseTime: `${responseTime} ms`,
      contentLength: `${contentLength} bytes`,
      status: res.statusCode,
    });
  });
  next();
});

app.get("/", (req, res) => {
  res.send("Choo Choo! Welcome to your Express app 🚅");
});

app.get("/json", (req, res) => {
  res.json({ "Choo Choo": "Welcome to your Express app 🚅" });
});

app.post("/post", (req, res) => {
  res.json({ "Choo Choo": "Welcome to your Express app 🚅", body: req.body });
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
