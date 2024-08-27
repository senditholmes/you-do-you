import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const { sign } = jwt;

const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, function (err, hash) {
        // Store hash in your password DB.
        if (err) {
          reject(err);
        } else {
          resolve(hash);
        }
      });
    });
  });
};

const prepareUserData = async (userData, type) => {
  const sanitzedUserData = userData;
  const hash = await hashPassword(sanitzedUserData.password);
  return new Promise((resolve, reject) => {
    try {
      if (type === "signup") {
        sanitzedUserData.password = hash;
        delete sanitzedUserData.confirmPassword;
        sanitzedUserData.createdAt = new Date()
          .toISOString()
          .slice(0, 19)
          .replace("T", " ");
      }

      resolve(sanitzedUserData);
    } catch (error) {
      reject(error);
    }
  });
};

const handleToken = async (userData) => {
  sign(
    {
      id: userData.UserID,
      firstName: userData.FirstName,
      username: userData.Username,
      email: userData.Email,
    },
    process.env.JWT_SECRET,
    {},
    (error, token) => {
      if (error) throw error;
      return token;
    }
  );
};

export { prepareUserData, handleToken };
