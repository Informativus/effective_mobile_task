export function checkStoreId(req, res, next) {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ error: "Shop ID is required" });
    return;
  }

  const validShopId = Number(id);

  if (isNaN(validShopId)) {
    res.status(400).json({ error: "Shop ID must be a number" });
    return;
  }

  req.shopId = validShopId;
  next();
}
