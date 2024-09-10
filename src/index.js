import express from "express";
import { ConfigService } from "./config/config.service.js";
import { ProductController } from "./product/product.controller.js";

const app = express();
const config = new ConfigService();
const port = config.get("PORT");
const mainPath = config.get("MAIN_PATH");

const productRouter = new ProductController().getRouter();
app.use(mainPath, productRouter);

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
