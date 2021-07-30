const jwt = require("jsonwebtoken");
const faculty = require("../models/faculty");

module.exports = async (req, res, next) => {
  try {
    //if there is a token
    const token = req.headers.authorization.split(" ")[1];
    //if yes then verify it
    const tokenData = jwt.verify(token, "sercret_and_longer_string");
    //appending decoded token data to request to be used for authorization
    req.userData = { email: tokenData.email, userId: tokenData.userId };
    let fac = await faculty.findById(req.userData.userId);
    if (!fac) {
      res.status(401).json({ message: "User is not authorised" });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "Auth failed at Faculty verification" });
  }
};
