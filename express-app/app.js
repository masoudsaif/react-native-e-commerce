const express = require("express");
const multer = require("multer");
const { PORT } = require("./constants");
const {
  verifyAdminToken,
  validateSignUp,
  validateSignIn,
  verifyCustomerToken,
} = require("./middlewares/auth.middleware");
const {
  signInController,
  signUpController,
} = require("./controllers/auth.controller");
const { connect } = require("./mongo");
const {
  validateProduct,
  validateProductReview,
} = require("./middlewares/products.middleware");
const {
  insertProductController,
  readProductsController,
  updateProductReviewController,
  deleteProductController,
} = require("./controllers/products.controller");
const {
  createAdminController,
  readUsersController,
  updateUserController,
} = require("./controllers/users.controller");
const {
  validateOrderUpdate,
  validateOrder,
} = require("./middlewares/orders.middleware");
const {
  updateOrderController,
  readOrdersController,
  createOrderController,
  readUserOrdersController,
} = require("./controllers/orders.controller");
const { validateUserUpdate } = require("./middlewares/users.controller");

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

connect();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(upload.array());

app.use(express.static("public"));

app.post("/sign-up", validateSignUp, signUpController);

app.post("/sign-in", validateSignIn, signInController);

app.get("/users", verifyAdminToken, readUsersController);

app.post("/users", verifyAdminToken, validateSignUp, createAdminController);

app.patch(
  "/users/:id",
  verifyAdminToken,
  validateUserUpdate,
  updateUserController
);

app.get("/users/:id/orders", verifyCustomerToken, readUserOrdersController);

app.post(
  "/users/:id/orders",
  verifyCustomerToken,
  validateOrder,
  createOrderController
);

app.get("/orders", verifyAdminToken, readOrdersController);

app.patch(
  "/orders/:id",
  verifyAdminToken,
  validateOrderUpdate,
  updateOrderController
);

app.get("/products", verifyCustomerToken, readProductsController);

app.post(
  "/products",
  verifyAdminToken,
  validateProduct,
  upload.array("images"),
  insertProductController
);

app.delete("/products/:id", verifyAdminToken, deleteProductController);

app.patch(
  "/products/:id/review",
  verifyCustomerToken,
  validateProductReview,
  updateProductReviewController
);

app.listen(PORT);
