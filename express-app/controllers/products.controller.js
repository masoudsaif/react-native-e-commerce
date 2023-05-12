const { PRODUCTS } = require("../constants");
const { getDb } = require("../mongo");
const { capitalize } = require("../string");

const readProductsController = async (req, res) => {
  const db = getDb();

  try {
    const products = await db.collection(PRODUCTS).find().toArray();

    return res.status(200).send(products);
  } catch (e) {
    return res
      .status(500)
      .send({ message: "Something went wrong, please try again later!" });
  }
};

const insertProductController = async (req, res) => {
  const db = getDb();
  const { name, category, price } = req.body;

  const _id = new ObjectId();
  const capitalizedName = capitalize(name);
  const capitalizedCategory = capitalize(category);
  const time = new Date().toLocaleDateString();
  const images = req.files.map((file) => ({
    data: file.buffer,
    contentType: file.mimetype,
  }));

  try {
    await db.collection(PRODUCTS).insertOne({
      _id,
      name: capitalizedName,
      category: capitalizedCategory,
      price,
      images,
      time,
      review: { score: 0, feedbacks: [] },
    });

    return res.status(200).send({ message: "Product added successfully!" });
  } catch (e) {
    return res
      .status(500)
      .send({ message: "Something went wrong, please try again later!" });
  }
};

const updateProductReviewController = async (req, res) => {
  const db = getDb();
  const { id } = req.params;
  const { stars, comment } = req.body;
  const _id = new ObjectId(id);
  const _feedbackId = new ObjectId();

  try {
    const product = await db.collection(PRODUCTS).findOne({ _id });

    const { feedbacks } = product.review;

    const didCustomerReview = feedbacks.some(
      (review) => review._id === req.user._id
    );

    if (didCustomerReview) {
      return res
        .status(400)
        .send({ message: "Customer already reviewed this product!" });
    }

    await db.collection(PRODUCTS).updateOne(
      { _id },
      {
        $push: { "review.$.feedbacks": { _id: _feedbackId, stars, comment } },
      }
    );

    const score = feedbacks.reduce((acc, a) => acc + a, 0);
    const avgScore = score / feedbacks.length;

    await db
      .collection(PRODUCTS)
      .updateOne({ _id }, { $set: { "review.$.score": avgScore } });

    return res.status(200).send({ message: "Review added successfully!" });
  } catch (e) {
    return res
      .status(500)
      .send({ message: "Something went wrong, please try again later!" });
  }
};

const deleteProductController = async (req, res) => {
  const db = getDb();
  const { id } = req.params;
  const _id = new ObjectId(id);

  try {
    await db.collection(PRODUCTS).deleteOne({ _id });

    return res.status(201).send({ message: "Product deleted successfully!" });
  } catch (e) {
    return res
      .status(500)
      .send({ message: "Something went wrong, please try again later!" });
  }
};

module.exports = {
  readProductsController,
  insertProductController,
  updateProductReviewController,
  deleteProductController,
};
