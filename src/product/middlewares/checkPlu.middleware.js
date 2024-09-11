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

function isNoValidMask(plu) {
  const maskChar = "#";
  const separatorChar = /[^-]/g;
  const mask = "########-####-####-####-############";
  const maskPlu = plu.replace(separatorChar, maskChar);

  if (maskPlu === mask) {
    return false;
  }

  return true;
}
