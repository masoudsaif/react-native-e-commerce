const validateProduct = (req, res, next) => {
  if (!req.body || !req.files) {
    return res.status(400).send({ message: "Please enter the missing data!" });
  }

  const { name, category, price } = req.body;

  if (!req.files.images) {
    return res.status(400).send({ message: "Please upload an image!" });
  }

  if (!name) {
    return res.status(400).send({ message: "Please enter a name!" });
  }

  if (!category) {
    return res.status(400).send({ message: "Please enter a category!" });
  }

  if (!price) {
    return res.status(400).send({ message: "Please enter a price!" });
  }

  next();
};

const validateProductReview = (req, res, next) => {
  if (!req.body) {
    return res.status(400).send({ message: "Please enter the missing data!" });
  }

  const { stars, comment } = req.body;

  if (!comment) {
    return res.status(400).send({ message: "Please enter a comment!" });
  }

  if (!stars || stars < 1 || stars > 5) {
    return res.status(400).send({ message: "Please choose a rating!" });
  }

  next();
};

module.exports = {
  validateProduct,
  validateProductReview,
};
