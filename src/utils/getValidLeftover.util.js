import { LeftoversService } from "../leftovers/leftovers.service.js";

export async function getValidLeftover(plu, storeId, res) {
  const leftoversService = new LeftoversService();
  const leftovers = await leftoversService.getLeftoversByPlu(plu);

  if (leftovers.length === 0) {
    return res.status(400).json({
      message: "Leftover not found",
    });
  }

  const storeInLeftovers = leftovers.find(
    (leftover) => leftover.store_id === storeId,
  );

  return storeInLeftovers;
}
