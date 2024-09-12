import { isNoValidMask } from "../../utils/validatePluMask.util.js";

// TODO: Нарушил SRP принцип
export function checkLeftoversDataOnType(req, res, next) {
  const { leftoversData } = req.body;

  if (!leftoversData) {
    return res.status(400).json({
      message: "Leftovers data is required",
    });
  }

  if (!leftoversData.plu || !leftoversData.storeId || !leftoversData.amount) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  if (isNoValidMask(leftoversData.plu)) {
    return res.status(400).json({
      message: "Plu is not valid",
    });
  }

  if (typeof leftoversData.storeId !== "number") {
    return res.status(400).json({
      message: "Store id must be a number",
    });
  }

  if (typeof leftoversData.amount !== "number") {
    return res.status(400).json({
      message: "Amount must be a number",
    });
  }

  next();
}
