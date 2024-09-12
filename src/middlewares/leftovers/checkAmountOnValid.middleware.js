import { getValidLeftover } from "../../utils/getValidLeftover.util.js";

export async function checkAmountOnValid(req, res, next) {
  const { leftoversData } = req.body;

  const validLeftover = await getValidLeftover(
    leftoversData.plu,
    leftoversData.storeId,
    res,
  );

  if (!validLeftover) {
    return res.status(400).json({
      message: "Store with leftover not found",
    });
  }

  if (validLeftover.quantity_on_shelf - leftoversData.amount < 0) {
    return res.status(400).json({
      message: "Not enough leftovers",
    });
  }

  next();
}
