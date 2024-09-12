export function checkAmount(req, res, next) {
  const { amount } = req.params;

  if (!amount) {
    res.status(400).json({
      message: "Amount is required",
    });
  }

  const validAmount = Number(amount);

  if (isNaN(validAmount)) {
    return res.status(400).json({
      message: "Amount must be a number",
    });
  }

  next();
}
