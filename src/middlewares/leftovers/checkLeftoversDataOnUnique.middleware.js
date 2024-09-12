import { LeftoversService } from "../../leftovers/leftovers.service.js";

export async function checkLeftoversDataOnUnique(req, res, next) {
  const { leftoversData } = req.body;

  const leftoversService = new LeftoversService();
  const leftovers = await leftoversService.getLeftoversByPlu(leftoversData.plu);

  if (leftovers.length === 0) {
    next();
    return;
  }

  for (const leftover of leftovers) {
    if (leftover.store_id === leftoversData.storeId) {
      return res.status(400).json({
        message: "Leftover for this store already exists",
      });
    }
  }

  next();
}
