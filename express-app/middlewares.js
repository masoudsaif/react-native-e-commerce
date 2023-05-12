const jwt = require("jsonwebtoken");
const { USER_ROLES } = require("./enums");
const { KEY } = require("./constants");

const validateAuthorizationHeaders = (req, res) => {
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
  if (!validateAuthorizationHeaders(req, res)) {
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
  if (!validateAuthorizationHeaders(req, res)) {
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

module.exports = {
  verifyCustomerToken,
  verifyAdminToken,
};
