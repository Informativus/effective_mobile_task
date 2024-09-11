export function checkStoreId(req, res, next) {
  const { id } = req.params;

  const validId = Number(id);

  if (isNaN(validId)) {
    res.status(400).json({ message: "Invalid store id" });
    return;
  }

  next();
}
