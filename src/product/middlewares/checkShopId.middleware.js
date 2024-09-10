export function checkShopId(req, res, next) {
  const { shopId } = req.params;

  if (!shopId) {
    res.status(400).json({ error: "Shop ID is required" });
    return;
  }

  const validShopId = Number(shopId);

  if (isNaN(validShopId)) {
    res.status(400).json({ error: "Shop ID must be a number" });
    return;
  }

  req.shopId = validShopId;
  next();
}
