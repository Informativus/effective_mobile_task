export function checkProductData(req, res, next) {
  if (!req.body) {
    res.status(400).json({ error: "Product data is required" });
    return;
  }

  const { productData } = req.body;

  if (!productData.name || !productData.price) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }

  const validPrice = parseFloat(productData.price);

  if (isNaN(validPrice)) {
    res.status(400).json({ error: "Price must be a number" });
    return;
  } else if (validPrice <= 0) {
    res.status(400).json({ error: "Price must be greater than 0" });
    return;
  } else if (validPrice > 9999999.99) {
    res.status(400).json({ error: "Price must be less than 9999999.99" });
    return;
  }

  req.productData = {
    ...productData,
    price: Math.round(validPrice * 100) / 100,
  };
  next();
}
