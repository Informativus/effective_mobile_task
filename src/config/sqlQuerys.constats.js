export const GET_PRODUCTS = "SELECT * FROM products";
export const GET_PRODUCT = "SELECT * FROM products WHERE plu = $1";
export const GET_PRODUCT_WITH_SHOP_ID =
  "SELECT * FROM products WHERE plu = (SELECT plu FROM stores WHERE id = $1)";
// TODO подумать как создавать plu
export const CREATE_PRODUCT =
  "INSERT INTO products (name, price) VALUES ($1, $2)";
