const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    res.status(200).json({ error: "Authorization token are missing  " });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userid = decoded.userid;
    next();
  } catch (error) {
    res.status(200).json({ error: "Invalide-token  " });
  }
};

module.exports = authenticate