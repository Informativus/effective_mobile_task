export function isNoValidMask(plu) {
  const maskChar = "#";
  const separatorChar = /[^-]/g;
  const mask = "########-####-####-####-############";
  const maskPlu = plu.replace(separatorChar, maskChar);

  if (maskPlu === mask) {
    return false;
  }

  return true;
}
