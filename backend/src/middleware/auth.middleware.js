const jwt = require("jsonwebtoken");

async function identifyUser(req, res, next) {
  const token = req.cookies.Jwt_token;

  if (!token) {
    return res.status(401).json({
      message: "token must be required,anautorized access",
    });
  }

  console.log("token", token);

  let decode = null;
  try {
    decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decode for get all post data", decode);
  } catch (error) {
    return res.status(401).json({
      message: "Unautorized",
    });
  }

  req.user = decode;
  next();
}

module.exports = identifyUser;
