import sqlite3 from "sqlite3";

sqlite3.verbose();
const db = new sqlite3.Database(
  "/Users/djh/Projects/you-do-you-app/db/youdoyou.db",
  (error) => {
    if (error) {
      console.log(`Error on connecting: + ${error.message}`);
    } else {
      console.log("Connected to database successfully.");
    }
  }
);

const insertQuery = async (user) => {
  return new Promise((resolve, reject) => {
    try {
      db.serialize(() => {
        db.run(
          "INSERT INTO Users (FirstName, LastName, Username, Email, PasswordHash, CreatedAt) VALUES ($firstName, $lastName, $username, $email, $password, $createdAt)",
          {
            $firstName: user.firstName,
            $lastName: user.lastName,
            $username: user.username,
            $email: user.email,
            $password: user.password,
            $createdAt: user.createdAt,
          },
          function (error) {
            if (error) {
              reject(error);
            } else {
              resolve(this.lastID);
            }
          }
        );
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getUserById = async (userId) => {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT * FROM Users WHERE UserId = $userId",
      {
        $userId: userId,
      },
      (err, row) => {
        if (err) {
          reject(err);
        }
        resolve(row);
      }
    );
  });
};

const checkIfUserExists = async (userData) => {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT * FROM Users WHERE Username = $username",
      {
        $username: userData.username,
      },
      (err, row) => {
        if (err) {
          reject(err);
        }
        resolve(row);
      }
    );
  });
};

export { insertQuery, checkIfUserExists, getUserById };
