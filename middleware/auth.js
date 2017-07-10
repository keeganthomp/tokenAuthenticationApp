var jwt = require("jsonwebtoken");
var jwtConfig = require("../jwtConfig");

function checkAuth(req, res, next) {
  var token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).send("User cannot be here. Missing Authorization.");
  }

  jwt.verify(token, jwtConfig.secret, function(err, tokenData) {
    if (err) {
      return res
        .status(400)
        .send("Access Denied. Secret does not work.");
    }

    console.log("tokenData", tokenData);

    req.user = tokenData.user;
    next();
  });
}

module.exports = checkAuth;