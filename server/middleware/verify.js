const jwt = require("jsonwebtoken");

const verify = (req, res, next) => {
  console.log(req.headers);
  const header = req.headers.authorization;
  console.log(header);
  if (!header) {
    return res.status(401).json("Token no encontrado");
  }

  //   Bearer token
  const token = header.split(" ")[1];
  if (!token) {
    return res.status(401).json("Token no valido");
  }

  jwt.verify(token, process.env.SECRET, (error, decoded) => {
    if (error) {
      console.log(error);
      return res.status(400).json(error);
    }
    console.log(decoded);
    next();
  });
};

module.exports = verify;
