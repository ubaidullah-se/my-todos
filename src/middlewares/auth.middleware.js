const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

authenticate_user = (req, _, next) => {
  let jwt_token = req.cookies["jwt-token"];
  if (jwt_token) {
    try {
      const decoded = jwt.verify(jwt_token, JWT_SECRET);
      req.user = decoded;
    } catch (e) {
      console.error(e);
    }
  }
  next();
};

module.exports = authenticate_user;
