import bcrypt from "bcrypt";

const passwordHash = (password) => {
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
      // Store hash in your password DB.
    });
  });
};

export { passwordHash };
