import express from "express";

const app = express();
const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res
    .json({
      message: "Hello World!",
      name: req.query.name,
    })
    .status(200);
});

async function start() {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
}

start();
