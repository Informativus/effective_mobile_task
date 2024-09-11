// PRODUCT
export const GET_PRODUCTS_PLUS_WTIH_NAME = "SELECT plu, name FROM Products";
export const GET_PRODUCT = "SELECT * FROM Products WHERE plu = $1";
export const GET_PRODUCT_PLU_WITH_SHOP_ID =
  "SELECT plu FROM Product_Store WHERE store_id = $1";
export const CREATE_PRODUCT =
  "INSERT INTO Products (plu, name, price) VALUES ($1, $2, $3)";

// STORE
export const GET_STORE_INFO_BY_ID = "SELECT * FROM Stores WHERE id = $1";
export const GET_STORES_IDS_WITH_NAME = "SELECT id, name FROM Stores";
export const CREATE_STORE = "INSERT INTO Stores (name) VALUES ($1)";
export const IS_EXIST_STORE =
  "SELECT EXISTS (SELECT 1 FROM Stores WHERE name = $1)";
