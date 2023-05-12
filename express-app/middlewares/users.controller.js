const validateUserUpdate = (req, res, next) => {
  if (!req.body) {
    return res.status(400).send({ message: "Please enter the missing data!" });
  }

  const { isDisabled } = req.body;

  if (typeof isDisabled !== "boolean") {
    return res.status(400).send({ message: "Please enter isDisabled!" });
  }

  next();
};

module.exports = {
  validateUserUpdate,
};
