const { getDb } = require("../mongo");
const { ORDERS } = require("../constants");
const { ObjectId } = require("mongodb");
const { ORDER_STATUS } = require("../enums");

const readOrdersController = async (req, res) => {
  const db = getDb();

  try {
    const orders = await db.collection(ORDERS).find().toArray();

    return res.status(200).send(orders);
  } catch (e) {
    return res
      .status(500)
      .send({ message: "Something went wrong, please try again later!" });
  }
};

const readUserOrdersController = async (req, res) => {
  const db = getDb();
  const { id } = req.params;
  const userId = new ObjectId(id);

  try {
    const orders = await db.collection(ORDERS).find({ userId }).toArray();

    return res.status(200).send(orders);
  } catch (e) {
    return res
      .status(500)
      .send({ message: "Something went wrong, please try again later!" });
  }
};

const createOrderController = async (req, res) => {
  const db = getDb();
  const { id } = req.params;
  const { products, payment } = req.body;
  const _id = new ObjectId();
  const userId = new ObjectId(id);
  const time = new Date().toLocaleDateString();

  const total = products.reduce(
    (acc, { price, quantity }) => acc + price * quantity,
    0
  );

  try {
    const order = {
      _id,
      userId,
      products,
      payment: payment.toUpperCase(),
      time,
      status: ORDER_STATUS.ORDERED,
      total,
    };

    await db.collection(ORDERS).insertOne(order);

    return res.status(200).send(order);
  } catch (e) {
    return res
      .status(500)
      .send({ message: "Something went wrong, please try again later!" });
  }
};

const updateOrderController = async (req, res) => {
  const db = getDb();
  const { id } = req.params;
  const { status } = req.body;
  const _id = new ObjectId(id);

  try {
    await db
      .collection(ORDERS)
      .updateOne({ _id }, { $set: { status: status.toUpperCase() } });

    return res.status(200).send({ status: status.toUpperCase() });
  } catch (e) {
    return res
      .status(500)
      .send({ message: "Something went wrong, please try again later!" });
  }
};

module.exports = {
  readOrdersController,
  readUserOrdersController,
  createOrderController,
  updateOrderController,
};
