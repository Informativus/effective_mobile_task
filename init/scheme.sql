CREATE TABLE Products (
  plu UUID PRIMARY KEY NOT NULL,
  name VARCHAR(128) NOT NULL,
  price DECIMAL(7, 2) NOT NULL
);

CREATE TABLE Stores (
  id serial PRIMARY KEY NOT NULL,
  name VARCHAR(128) NOT NULL
);

CREATE TABLE Stocks (
  id serial PRIMARY KEY NOT NULL,
  plu UUID NOT NULL,
  store_id INT NOT NULL,
  quantity_on_shelf INT NOT NULL,
  FOREIGN KEY (plu) REFERENCES Products(plu),
  FOREIGN KEY (store_id) REFERENCES Stores(id)
);

CREATE TABLE Orders (
  id serial PRIMARY KEY NOT NULL,
  store_id INT NOT NULL,
  plu UUID NOT NULL,
  quantity_in_order INT NOT NULL,
  FOREIGN KEY (store_id) REFERENCES Stores(id),
  FOREIGN KEY (plu) REFERENCES Products(plu)
);

CREATE VIEW Product_Store AS
  SELECT plu, store_id FROM Stocks;
