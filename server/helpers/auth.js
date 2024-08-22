import bcrypt from "bcrypt";

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

const prepareUserForInsert = async (user) => {
  const sanitzedUser = user;
  const hash = await hashPassword(sanitzedUser.password);
  return new Promise((resolve, reject) => {
    try {
      delete sanitzedUser.confirmPassword;
      sanitzedUser.createdAt = new Date()
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      sanitzedUser.password = hash;

      resolve(sanitzedUser);
    } catch (error) {
      reject(error);
    }
  });
};

export default prepareUserForInsert;
