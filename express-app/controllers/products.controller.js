const { ObjectId } = require("mongodb");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { PRODUCTS, BUCKET_NAME } = require("../constants");
const { getDb } = require("../mongo");
const { capitalize } = require("../string");
const { getS3Client } = require("../s3-client");

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
  const s3 = getS3Client();
  const { name, category, description, price } = req.body;
  const { images } = req.files;
  const _id = new ObjectId();
  const capitalizedCategory = capitalize(category);
  const intPrice = parseInt(price);
  const time = new Date().toLocaleDateString();

  const uploadedImages = [];
  const createUploadPromise = (file, i) => {
    const params = {
      Bucket: BUCKET_NAME,
      Key: `products/${_id.toString()}${i}`,
      Body: file.data,
      ContentType: file.mimetype,
    };
    uploadedImages.push(
      `https://${BUCKET_NAME}.s3.amazonaws.com/products/${_id.toString()}${i}`
    );
    const command = new PutObjectCommand(params);
    return s3.send(command);
  };

  const uploadPromises = images.length
    ? images.map(createUploadPromise)
    : [createUploadPromise(images, 0)];

  try {
    await Promise.all(uploadPromises);
    const product = {
      _id,
      name,
      category: capitalizedCategory,
      price: intPrice,
      images: uploadedImages,
      description,
      time,
      review: { score: 0, feedbacks: [] },
    };

    await db.collection(PRODUCTS).insertOne(product);
    return res.status(201).json(product);
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Something went wrong, please try again later!" });
  }
};

const updateProductController = async (req, res) => {
  const db = getDb();
  const s3 = getS3Client();
  const { id } = req.params;
  const { name, category, description, price } = req.body;
  const { images } = req.files;
  const _id = new ObjectId(id);
  const capitalizedCategory = capitalize(category);
  const intPrice = parseInt(price);
  const time = new Date().toLocaleDateString();

  const uploadedImages = [];
  const createUploadPromise = (file, i) => {
    const params = {
      Bucket: BUCKET_NAME,
      Key: `products/${_id.toString()}${i}`,
      Body: file.data,
      ContentType: file.mimetype,
    };
    uploadedImages.push(
      `https://${BUCKET_NAME}.s3.amazonaws.com/products/${_id.toString()}${i}`
    );
    const command = new PutObjectCommand(params);
    return s3.send(command);
  };

  const uploadPromises = images.length
    ? images.map(createUploadPromise)
    : [createUploadPromise(images, 0)];

  try {
    await Promise.all(uploadPromises);
    const product = {
      _id,
      name,
      category: capitalizedCategory,
      price: intPrice,
      images: uploadedImages,
      description,
      time,
      review: { score: 0, feedbacks: [] },
    };

    await db.collection(PRODUCTS).updateOne({ _id }, { $set: product });
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
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
  const numberedStars = parseInt(stars);

  try {
    const product = await db.collection(PRODUCTS).findOne({ _id });

    const { feedbacks } = product.review;

    await db.collection(PRODUCTS).updateOne(
      { _id },
      {
        $push: {
          "review.feedbacks": {
            _id: _feedbackId,
            stars: numberedStars,
            comment,
          },
        },
      }
    );

    const score = feedbacks.reduce((acc, a) => acc + a.stars, 0);
    const avgScore = score / feedbacks.length;

    await db
      .collection(PRODUCTS)
      .updateOne({ _id }, { $set: { "review.score": avgScore } });
    return res
      .status(200)
      .send({ _id: _feedbackId, stars: numberedStars, comment });
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

    return res.status(200).send({ message: "Product deleted successfully!" });
  } catch (e) {
    return res
      .status(500)
      .send({ message: "Something went wrong, please try again later!" });
  }
};

module.exports = {
  readProductsController,
  insertProductController,
  updateProductController,
  updateProductReviewController,
  deleteProductController,
};
