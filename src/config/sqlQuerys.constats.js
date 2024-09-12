// PRODUCT
export const GET_PRODUCTS_PLUS_WTIH_NAME = "SELECT plu, name FROM Products";
export const GET_PRODUCT = "SELECT * FROM Products WHERE plu = $1";
export const GET_PRODUCT_PLU_WITH_SHOP_ID =
  "SELECT plu FROM Product_Store WHERE store_id = $1";
export const CREATE_PRODUCT =
  "INSERT INTO Products (plu, name, price) VALUES ($1, $2, $3) RETURNING plu";

// STORE
export const GET_STORE_INFO_BY_ID = "SELECT * FROM Stores WHERE id = $1";
export const GET_STORES_IDS_WITH_NAME = "SELECT id, name FROM Stores";
export const CREATE_STORE =
  "INSERT INTO Stores (name) VALUES ($1) RETURNING id";
export const IS_EXIST_STORE =
  "SELECT EXISTS (SELECT 1 FROM Stores WHERE name = $1)";

// LEFTOVERS
export const CREAT_LEFTOVERS =
  "INSERT INTO Leftovers (plu, store_id, quantity_on_shelf) VALUES ($1, $2, $3)";
export const GET_LEFTOVERS_BY_STORE_ID =
  "SELECT plu, quantity_on_shelf FROM Leftovers WHERE store_id = $1";
export const GET_LEFTOVERS_BY_PLU =
  "SELECT st.name AS store_name, l.store_id, l.quantity_on_shelf FROM Leftovers l JOIN Stores st ON st.id = l.store_id WHERE plu = $1";
export const GET_LEFTOVERS_BY_PLU_AND_LEFTOVERS_AMOUNT =
  "SELECT st.name AS store_name, l.quantity_on_shelf FROM Leftovers l JOIN Stores st ON st.id = l.store_id WHERE plu = $1 AND l.quantity_on_shelf >= $2";
