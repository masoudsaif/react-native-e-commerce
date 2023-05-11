const PORT = 4000;
const URI =
  "mongodb+srv://admin:a7oCH8DI5TmbWx7C@cluster.jmlrro8.mongodb.net/?retryWrites=true&w=majority";
const DB = "e-commerce";
const USERS = "users";
const PRODUCTS = "products";
const ORDERS = "orders";
const KEY =
  "_Qb4YFrSO_L_M8hQiyIC-CIBmad84arAchnS47pykSPwZWkQXZCkBivQLa7TwNTRWmUKaSPoXmSOLdjeDNMvxCim-SySHbLsjji_Bp9Mi05K_z_mnM9hUZhmnryGybe-sHHZAyjYHrysrrxpGJIwmc2ynYQYqjMXP_W8pAJH1oc";
const TOKEN_EXPIRY_TIME = 86400;

module.exports = {
  PORT,
  URI,
  DB,
  USERS,
  PRODUCTS,
  ORDERS,
  KEY,
  TOKEN_EXPIRY_TIME,
};
