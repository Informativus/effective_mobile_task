import { isNoValidMask } from "../../utils/validatePluMask.util.js";

export function checkOrderDataTypes(req, res, next) {
  const { orderData } = req.body;

  if (!orderData) {
    return res.status(400).json({
      message: "Order data is required",
    });
  }

  if (!orderData.plu || !orderData.storeId || !orderData.amount) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  if (isNoValidMask(orderData.plu)) {
    return res.status(400).json({
      message: "Plu is not valid",
    });
  }

  if (typeof orderData.storeId !== "number") {
    return res.status(400).json({
      message: "Store id must be a number",
    });
  }

  if (typeof orderData.amount !== "number") {
    return res.status(400).json({
      message: "Amount must be a number",
    });
  }

  next();
}
