const jwt = require("jsonwebtoken");
const SECRET = 'SECr3t';  // This should be in an environment variable in a Real World Application

//Auth Middleware 
function authenticateJwt(req, res, next){
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.userId = user.id;
      next();
    });
  }
  else {
    res.sendStatus(401);
  }
}

module.exports = {
    SECRET,
    authenticateJwt
}