import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// GLOBAL
const JWT_SECRET = process.env.JWT_SECRET;

function protect(req, res, next) {
  console.log("Verifying JWT TOKEN");

  if (req.cookies["access_token"]) {
    const cookie = jwt.verify(req.cookies["access_token"], JWT_SECRET);
    req.verifiedCookie = cookie;
    console.log(cookie);
    next();
  } else {
    console.log("JWT Check Failed");
    res.status(401).send({ success: false, message: "Please login again." });
    return;
  }
}

export default protect;
