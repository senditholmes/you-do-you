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

const validateUser = async (userData, verifiedRow) => {
  if (userData.password === verifiedRow.password) {
    console.log("User validated");
    return 1;
  } else {
    console.log("User password incorrect.");
    return 0;
  }
};

export { prepareUserData, validateUser };
