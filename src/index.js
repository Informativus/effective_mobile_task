import express from "express";
import { ConfigService } from "./config/config.service.js";
import { LeftoversController } from "./leftovers/leftovers.controller.js";
import { OrderController } from "./order/order.controller.js";
import { ProductController } from "./product/product.controller.js";
import { StoreController } from "./store/store.controller.js";
import { routesList } from "./utils/routesList.util.js";

const app = express();
app.use(express.json());

const config = new ConfigService();
const port = config.get("PORT");
const mainPath = config.get("MAIN_PATH");

const productRouter = new ProductController().getRouter();
const storeRouter = new StoreController().getRouter();
const leftoverRouter = new LeftoversController().getRouter();
const orderRouter = new OrderController().getRouter();

app.use(mainPath, productRouter);
app.use(mainPath, storeRouter);
app.use(mainPath, leftoverRouter);
app.use(mainPath, orderRouter);

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
    routesList(app, `http://localhost:${port}${mainPath}`);
  });
}

start();
