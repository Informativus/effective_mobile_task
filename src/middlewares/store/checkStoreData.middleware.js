export function checkStoreData(req, res, next) {
  const { storeData } = req.body;

  if (!storeData) {
    res.status(400).json({ error: "Store data is required" });
    return;
  }

  if (!storeData.name) {
    res.status(400).json({ error: "Store name is required" });
    return;
  }

  next();
}
