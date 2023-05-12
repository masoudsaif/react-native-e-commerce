const PORT = 4000;
const DB = "e-commerce";
const USERS = "users";
const PRODUCTS = "products";
const ORDERS = "orders";
const TOKEN_EXPIRY_TIME = 86400;
const URI = process.env.DB_URI;
const KEY = process.env.JWT_KEY;
const ACCESS_KEY = process.env.ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;
const BUCKET_NAME = process.env.BUCKET_NAME;

module.exports = {
  PORT,
  URI,
  DB,
  USERS,
  PRODUCTS,
  ORDERS,
  KEY,
  TOKEN_EXPIRY_TIME,
  ACCESS_KEY,
  SECRET_ACCESS_KEY,
};
