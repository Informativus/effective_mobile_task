import { getValidLeftover } from "../../utils/getValidLeftover.util.js";

export async function checkAmountOnValid(req, res, next) {
  const { orderData } = req.body;

  if (orderData.amount < 0) {
    return res.status(400).json({
      message: "Amount must be greater than 0",
    });
  }

  const validLeftover = await getValidLeftover(
    orderData.plu,
    orderData.storeId,
    res,
  );

  if (!validLeftover) {
    return res.status(400).json({
      message: "Store with leftover not found",
    });
  }

  if (validLeftover.quantity_on_shelf - orderData.amount < 0) {
    return res.status(400).json({
      message: "Not enough leftovers",
    });
  }

  next();
}
