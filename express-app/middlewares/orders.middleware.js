const { ORDER_STATUS, PAYMENT_TYPE } = require("../enums");

const validateOrder = (req, res, next) => {
  if (!req.body) {
    return res.status(400).send({ message: "Please enter the missing data!" });
  }

  const { products, payment, card } = req.body;

  if (!products || !products.length) {
    return res.status(400).send({ message: "Please enter the products!" });
  }

  if (!payment) {
    return res.status(400).send({ message: "Please enter the payment!" });
  }

  const upperCasePayment = payment.toUpperCase();

  if (
    upperCasePayment !== PAYMENT_TYPE.CARD &&
    upperCasePayment !== PAYMENT_TYPE.CASH
  ) {
    return res.status(400).send({ message: "Invalid payment!" });
  }

  if (upperCasePayment === PAYMENT_TYPE.CARD && !card) {
    return res.status(400).send({ message: "Invalid payment!" });
  }

  if (upperCasePayment === PAYMENT_TYPE.CARD && card && !card.number) {
    return res.status(400).send({ message: "Invalid card number!" });
  }

  if (upperCasePayment === PAYMENT_TYPE.CARD && card && !card.cvc) {
    return res.status(400).send({ message: "Invalid cvc number!" });
  }

  if (
    upperCasePayment === PAYMENT_TYPE.CARD &&
    card &&
    !card.cvc.length === 3 &&
    !card.number.length === 16
  ) {
    return res.status(400).send({ message: "Invalid card or cvc number!" });
  }

  next();
};

const validateOrderUpdate = (req, res, next) => {
  if (!req.body) {
    return res.status(400).send({ message: "Please enter the missing data!" });
  }

  const { status } = req.body;

  if (!status) {
    return res.status(400).send({ message: "Status is not valid!" });
  }

  const upperCaseStatus = status.toUpperCase();

  if (
    upperCaseStatus !== ORDER_STATUS.CANCELED &&
    upperCaseStatus !== ORDER_STATUS.DELIVERED &&
    upperCaseStatus !== ORDER_STATUS.ORDERED &&
    upperCaseStatus !== ORDER_STATUS.RETURNED
  ) {
    return res.status(400).send({ message: "Status is not valid!" });
  }

  next();
};

module.exports = {
  validateOrder,
  validateOrderUpdate,
};
