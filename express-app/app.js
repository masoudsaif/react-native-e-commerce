const express = require("express");
const fileUpload = require("express-fileupload");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { MongoClient, ObjectId } = require("mongodb");
const {
  URI,
  DB,
  PORT,
  USERS,
  KEY,
  TOKEN_EXPIRY_TIME,
  PRODUCTS,
} = require("./constants");
const { EMAIL_REGEX } = require("./regex");
const { capitalize } = require("./string");
const { USER_ROLES } = require("./enums");
const { verifyAdminToken } = require("./middlewares");

const app = express();
const client = new MongoClient(URI);
let db = null;

(async () => {
  try {
    await client.connect();
    db = client.db(DB);
    console.log("Connected");
  } catch (e) {
    console.log(e);
  }
})();

app.use(fileUpload());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.post("/sign-up", async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Please enter the missing data!" });
  }

  const { email, password, confirmPassword, fullName } = req.body;

  if (!email || !EMAIL_REGEX.test(email)) {
    return res.status(400).send({ message: "Please enter a valid email!" });
  }

  if (!password || password.length < 8) {
    return res
      .status(400)
      .send({ message: "Please enter a password longer than 8 characters!" });
  }

  if (!confirmPassword || confirmPassword !== password) {
    return res
      .status(400)
      .send({ message: "Confirm password must match password!" });
  }

  if (!fullName || fullName.split(" ").length < 2) {
    return res.status(400).send({ message: "Please enter your fullname!" });
  }

  const _id = new ObjectId();
  const lowerCaseEmail = email.toLowerCase();
  const hashedPassword = bcrypt.hashSync(password, 8);
  const capitalizedFullName = capitalize(fullName);
  const time = new Date().toLocaleDateString();
  const role = USER_ROLES.CUSTOMER;
  const isDisabled = false;

  try {
    await db.collection(USERS).insertOne({
      _id,
      email: lowerCaseEmail,
      password: hashedPassword,
      fullName: capitalizedFullName,
      time,
      role,
      isDisabled,
    });

    const token = jwt.sign(
      {
        _id,
        email: lowerCaseEmail,
        role,
      },
      KEY,
      {
        expiresIn: TOKEN_EXPIRY_TIME,
      }
    );

    return res.status(200).send({
      _id,
      token,
      email: lowerCaseEmail,
      fullName: capitalizedFullName,
      time,
      role,
      isDisabled,
    });
  } catch (e) {
    return res
      .status(500)
      .send({ message: "Something went wrong, please try again later!" });
  }
});

app.post("/sign-in", async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Please enter the missing data!" });
  }

  const { email, password } = req.body;

  if (!email || !EMAIL_REGEX.test(email)) {
    return res.status(400).send({ message: "Invalid credentials!" });
  }

  if (!password || password.length < 8) {
    return res.status(400).send({ message: "Invalid credentials!" });
  }

  const lowerCaseEmail = email.toLowerCase();

  try {
    const user = await db.collection(USERS).findOne({ email: lowerCaseEmail });

    if (!user) {
      return res.status(400).send({ message: "Invalid credentials!" });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).send({ message: "Invalid credentials!" });
    }

    const token = jwt.sign(
      {
        _id: user.id,
        email: lowerCaseEmail,
        role: user.role,
      },
      KEY,
      {
        expiresIn: TOKEN_EXPIRY_TIME,
      }
    );

    return res.status(200).send({
      ...user,
      token,
    });
  } catch (e) {
    return res
      .status(500)
      .send({ message: "Something went wrong, please try again later!" });
  }
});

app.post("/products", verifyAdminToken, async (req, res) => {
  console.log(req.body);
  console.log(req.files);
  if (!req.body || !req.files) {
    return res.status(400).send({ message: "Please enter the missing data!" });
  }

  const { images } = req.files;
  const { name, category, price } = req.body;

  if (!images.length && !images.name) {
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

  const _id = new ObjectId();
  const capitalizedName = capitalize(name);
  const capitalizedCategory = capitalize(category);
  const time = new Date().toLocaleDateString();

  const imagesUris = images.length
    ? images.map((img, i) => {
        const uri = `${__dirname}"/products/"${_id.toString()}${i}${img.name}`;
        img.mv(uri);

        return uri;
      })
    : [`${_id.toString()}0`];

  if (!images.length) {
    images.mv(`${__dirname}"/products/"${_id.toString()}0${images.name}`);
  }
  console.log(imagesUris);
  try {
    // await db.collection(PRODUCTS).insertOne({
    //   _id,
    //   name: capitalizedName,
    //   category: capitalizedCategory,
    //   images: imagesUris,
    //   time,
    //   review: { score: 0, feedbacks: [] },
    // });

    return res.status(200).send({ message: "Product added successfully!" });
  } catch (e) {
    return res
      .status(500)
      .send({ message: "Something went wrong, please try again later!" });
  }
});

app.listen(PORT);
