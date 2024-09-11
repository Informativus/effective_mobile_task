// PRODUCT
export const GET_PRODUCTS = "SELECT * FROM Products";
export const GET_PRODUCT = "SELECT * FROM Products WHERE plu = $1";
export const GET_PRODUCT_PLU_WITH_SHOP_ID =
  "SELECT * FROM Product_Store WHERE store_id = $1";
// TODO подумать как создавать plu
export const CREATE_PRODUCT =
  "INSERT INTO Products (plu, name, price) VALUES ($1, $2, $3)";

// STORE
export const GET_STORE_ID_BY_NAME = "SELECT id FROM Stores WHERE name = $1";
export const CREATE_STORE = "INSERT INTO Stores (name) VALUES ($1)";
