const { USER_ROLES } = require("./enums");

const validateAuthorizationHeaders = (req, res) => {
  if (
    !req.headers ||
    !req.headers.authorization ||
    !(req.headers.authorization.split(" ")[0] === "JWT")
  ) {
    res.status(401).send({ message: "Unauthorized access!" });
  }
};

const verifyCustomerToken = (req, res, next) => {
  validateAuthorizationHeaders(req, res);

  jwt.verify(req.headers.authorization.split(" ")[1], KEY, (error, decode) => {
    if (error) {
      res.status(401).send({ message: "Unauthorized access!" });
    } else {
      req.user = decode;
      next();
    }
  });
};

const verifyAdminToken = (req, res, next) => {
  validateAuthorizationHeaders(req, res);

  jwt.verify(req.headers.authorization.split(" ")[1], KEY, (error, decode) => {
    if (error) {
      res.status(401).send({ message: "Unauthorized access!" });
    } else {
      if (decode.role === USER_ROLES.CUSTOMER) {
        res.status(403).send({ message: "Forbidden access!" });
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
