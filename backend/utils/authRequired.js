const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authRequired = async (request, response, next) => {
  const authorization = request.get("Authorization");

  if (!authorization || !authorization.toLowerCase().startsWith("bearer ")) {
    return response.status(401).json({ error: "missing or invalid token" });
  }

  const token = authorization.substring(7);
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const user = await User.findById(decodedToken.id);
    if (!user) {
      return response.status(401).json({ error: "user not found" });
    }
    request.user = user;
    next();
  } catch (error) {
    return response.status(401).json({ error: "invalid token" });
  }
};

module.exports = { authRequired };
