const bcrypt = require("bcrypt");
const { USERS } = require("../constants");
const { USER_ROLES } = require("../enums");
const { getDb } = require("../mongo");
const { capitalize } = require("../string");
const { ObjectId } = require("mongodb");

const createAdminController = async (req, res) => {
  const db = getDb();
  const { email, password, fullName } = req.body;
  const _id = new ObjectId();
  const lowerCaseEmail = email.toLowerCase();
  const hashedPassword = bcrypt.hashSync(password, 8);
  const capitalizedFullName = capitalize(fullName);
  const time = new Date().toLocaleDateString();
  const role = USER_ROLES.ADMIN;
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

    return res.status(200).send({ message: "Created user successfully!" });
  } catch (e) {
    return res
      .status(500)
      .send({ message: "Something went wrong, please try again later!" });
  }
};

const readUsersController = async (req, res) => {
  const db = getDb();
  try {
    const users = await db.collection(USERS).find().toArray();

    return res.status(200).send(users);
  } catch (e) {
    return res
      .status(500)
      .send({ message: "Something went wrong, please try again later!" });
  }
};

const updateUserController = async (req, res) => {
  const { id } = req.params;
  const { isDisabled } = req.body;
  const _id = new ObjectId(id);

  try {
    await db.collection(USERS).updateOne({ _id }, { $set: { isDisabled } });

    return res.status(200).send({ message: "Updated user successfully!" });
  } catch (e) {
    return res
      .status(500)
      .send({ message: "Something went wrong, please try again later!" });
  }
};

module.exports = {
  createAdminController,
  readUsersController,
  updateUserController,
};
