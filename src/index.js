import express from "express";
const app = express();

import { HomeRoute } from "./routes/home.route.js";
app.use("/", HomeRoute);

app.set('views', '/Website'); // Set the views directory
app.set('view engine', 'ejs');  // Set the view engine to EJS

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

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
