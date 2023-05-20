const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { USERS, KEY, TOKEN_EXPIRY_TIME } = require("../constants");
const { USER_ROLES } = require("../enums");
const { capitalize } = require("../string");
const { getDb } = require("../mongo");
const { ObjectId } = require("mongodb");

const signInController = async (req, res) => {
  const db = getDb();
  const { email, password } = req.body;
  const lowerCaseEmail = email.toLowerCase();

  try {
    const user = await db.collection(USERS).findOne({ email: lowerCaseEmail });

    if (!user) {
      return res.status(400).send({ message: "Invalid credentials!" });
    }

    if (user.isDisabled) {
      return res.status(400).send({ message: "Your account is disabled!" });
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
};

const signUpController = async (req, res) => {
  const db = getDb();
  const { email, password, fullName } = req.body;
  const _id = new ObjectId();
  const lowerCaseEmail = email.toLowerCase();
  const hashedPassword = bcrypt.hashSync(password, 8);
  const capitalizedFullName = capitalize(fullName);
  const time = new Date().toLocaleDateString();
  const role = USER_ROLES.CUSTOMER;
  const isDisabled = false;

  try {
    const doesUserExist = await db
      .collection(USERS)
      .findOne({ email: lowerCaseEmail });

    if (doesUserExist) {
      return res.status(400).send({ message: "Email is already registered!" });
    }

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
};

module.exports = {
  signInController,
  signUpController,
};
