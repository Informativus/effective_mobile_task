import { isNoValidMask } from "../../utils/validatePluMask.util.js";

export function checkPlu(req, res, next) {
  const { plu } = req.params;

  if (!plu) {
    res.status(400).json({ error: "PLU is required" });
    return;
  }

  const validPlu = String(plu);

  console.log();
  if (isNoValidMask(validPlu)) {
    res.status(400).json({ error: "Incorrect PLU" });
    return;
  }

  next();
}
