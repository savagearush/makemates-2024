import jwt from "jsonwebtoken";

function auth(req, res, next) {
  const token = req.cookies["x-auth-token"];  
  console.log("JWT: ", token);
  if (token !== undefined && token !== null) {
    jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, decoded) => {
      if (err) {
        return res.status(301).send("LoggedIn First");
      } else {
        req.user = decoded;
        return next();
      }
    });
  } else {
    return res.status(301).send("LoggedIn First");
  }
}

export default auth;
