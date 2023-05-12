const jwt = require("jsonwebtoken");
const { USER_ROLES } = require("../enums");
const { KEY } = require("../constants");
const { EMAIL_REGEX } = require("../regex");

const getIsAuthHeadersValid = (req) => {
  if (
    !req.headers ||
    !req.headers.authorization ||
    !(req.headers.authorization.split(" ")[0] === "Bearer")
  ) {
    return false;
  }

  return true;
};

const verifyCustomerToken = (req, res, next) => {
  if (!getIsAuthHeadersValid(req)) {
    return res.status(401).send({ message: "Unauthorized access!" });
  }

  jwt.verify(req.headers.authorization.split(" ")[1], KEY, (error, decode) => {
    if (error) {
      return res.status(401).send({ message: "Unauthorized access!" });
    } else {
      req.user = decode;
      next();
    }
  });
};

const verifyAdminToken = (req, res, next) => {
  if (!getIsAuthHeadersValid(req)) {
    return res.status(401).send({ message: "Unauthorized access!" });
  }

  jwt.verify(req.headers.authorization.split(" ")[1], KEY, (error, decode) => {
    if (error) {
      return res.status(401).send({ message: "Unauthorized access!" });
    } else {
      if (decode.role === USER_ROLES.CUSTOMER) {
        return res.status(403).send({ message: "Forbidden access!" });
      } else {
        req.user = decode;
        next();
      }
    }
  });
};

const validateSignIn = (req, res, next) => {
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

  next();
};

const validateSignUp = (req, res, next) => {
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

  next();
};

module.exports = {
  verifyCustomerToken,
  verifyAdminToken,
  validateSignIn,
  validateSignUp,
};
