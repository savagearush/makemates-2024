import { validateNewUser, validateUser } from "../utils/validate.js";
import DB from "../db/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function login(req, res) {
  const { error } = validateUser(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  DB.query(
    "SELECT * FROM users WHERE email = ?",
    [req.body.email],
    (err, result) => {
      if (err) return res.status(400).send(err);

      if (result.length) {
        const user = result[0];
        const hashedPassword = user.password;

        bcrypt.compare(req.body.password, hashedPassword, (err, valid) => {
          if (err) {
            return res.status(400).send(err);
          }

          if (valid) {
            const token = jwt.sign(
              { id: user.id },
              process.env.JWT_PRIVATE_KEY,
              {
                expiresIn: "24hr",
              }
            );

            return res
              .cookie("x-auth-token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite:
                  process.env.NODE_ENV === "production" ? "None" : "Lax",
              })
              .status(200)
              .send({ id: user.id });
          } else {
            return res.status(401).send("Incorrect Password");
          }
        });
      } else {
        return res.status(400).send("Email id not found");
      }
    }
  );
}

export function register(req, res) {
  const { error } = validateNewUser(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  DB.query(
    "SELECT email FROM users WHERE email = ?",
    [req.body.email],
    (err, result) => {
      if (err) return res.status(400).send(err);
      if (result.length) {
        return res.status(401).send("User already exist.");
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            const newUser = {
              name: req.body.name,
              email: req.body.email,
              password: hash,
              gender: req.body.gender,
              dob: `${req.body.day} ${req.body.month} ${req.body.year}`,
            };

            DB.query(
              "INSERT INTO users (name, email, password, gender, dob) VALUES (?, ?, ?, ?, STR_TO_DATE(?, '%d %M %Y'))",
              [...Object.values(newUser)],
              (err, result) => {
                if (err) return res.status(400).send(err);

                const token = jwt.sign(
                  { id: result.insertId },
                  process.env.JWT_PRIVATE_KEY,
                  {
                    expiresIn: "24hr",
                  }
                );
                return res
                  .cookie("x-auth-token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite:
                      process.env.NODE_ENV === "production" ? "None" : "Lax",
                  })
                  .status(200)
                  .send({ id: result.insertId });
              }
            );
          });
        });
      }
    }
  );
}

export async function getUserData(req, res) {
  const { id } = req.user;
  console.log("id", id);

  let query =
    "SELECT u.id, u.name, u.email, p.image_url FROM users u LEFT JOIN profileimages p ON u.img = p.id WHERE u.id = ?";

  DB.query(query, [id], (err, result) => {
    if (err) return res.status(401).send(err);
    if (result.length) {
      result[0].password = "************";
      return res.send(result[0]);
    }
  });
}

export function updateUserInfo(req, res) {
  const { id } = req.user;
  const { key, value } = req.body;

  if (key === "name") {
    let query = `UPDATE users SET name = ? WHERE id = ${id}`;
    DB.query(query, [value], (err, result) => {
      if (err) return res.status(401).send(err);
      return res.status(200).send("Name Updated Successfully.");
    });
  }

  if (key === "email") {
    let query = `UPDATE users SET email = ? WHERE id = ${id}`;
    DB.query(query, [value], (err, result) => {
      if (err) return res.status(401).send(err);
      return res.status(200).send("Emaild Id Updated Successfully.");
    });
  }

  if (key === "password") {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(value, salt, (err, hash) => {
        let query = `UPDATE users SET password = ? WHERE id = ${id}`;
        DB.query(query, [hash], (err, result) => {
          if (err) return res.status(401).send(err);
          return res.status(200).send("Password updated Successfully.");
        });
      });
    });
  }

  if (key === "birthday") {
    let query = `UPDATE users SET dob = STR_TO_DATE(?, '%d %M %Y') WHERE id = ${id}`;
    DB.query(query, [value], (err, result) => {
      if (err) return res.status(401).send(err);
      return res.status(200).send("Bithday updated Successfully.");
    });
  }

  if (key === "mobile_number") {
    let query = `UPDATE users SET mobile_number = ? WHERE id = ${id}`;
    DB.query(query, [value], (err, result) => {
      if (err) return res.status(401).send(err);
      return res.status(200).send("Mobile Number updated Successfully.");
    });
  }

  if (key === "city") {
    let query = `UPDATE users SET city = ? WHERE id = ${id}`;
    DB.query(query, [value], (err, result) => {
      if (err) return res.status(401).send(err);
      return res.status(200).send("City updated Successfully.");
    });
  }

  if (key === "state") {
    let query = `UPDATE users SET state = ? WHERE id = ${id}`;
    DB.query(query, [value], (err, result) => {
      if (err) return res.status(401).send(err);
      return res.status(200).send("State updated Successfully.");
    });
  }

  if (key === "country") {
    let query = `UPDATE users SET country = ? WHERE id = ${id}`;
    DB.query(query, [value], (err, result) => {
      if (err) return res.status(401).send(err);
      return res.status(200).send("Country updated Successfully.");
    });
  }
}

export function followUser(req, res) {
  const { id } = req.user;

  DB.query(
    "INSERT INTO relationships (`follow_id`, `follower_id`) VALUES(?, ?)",
    [req.body.friendId, id],
    (err, result) => {
      if (err) return res.status(401).send(err);
      console.log(result);
      return res.status(200).send("DONE");
    }
  );
}

export function unfollowUser(req, res) {
  const { id } = req.user;

  DB.query(
    "DELETE FROM relationships WHERE follow_id = ? AND follower_id = ?",
    [req.body.friendId, id],
    (err, result) => {
      if (err) return res.status(401).send(err);
      console.log(result);
      return res.status(200).send("DONE");
    }
  );
}

export function getFriendList(req, res) {
  const { id } = req.user;

  let query =
    "SELECT r.follow_id, r.follower_id, u.name, u.email, u.mobile_number, u.city, pis.image_url AS profileImage FROM relationships r JOIN users u ON r.follow_id = u.id LEFT JOIN profileimages pis ON u.img = pis.id WHERE follower_id = ?";
  DB.query(query, [id], (err, result) => {
    if (err) return res.status(401).send(err);
    if (result.length > 0) {
      return res.status(200).send(result);
    } else {
      return res.status(200).send([]);
    }
  });
}

export function setProfilePic(req, res) {
  const { id } = req.user;
  const { profileImgUrl } = req.body;

  console.log(`id : ${id}, ProfileImageURL : ${profileImgUrl}`);

  DB.query(
    "INSERT into profileimages (`user_id`, `image_url`, `currentImg`) VALUES(?, ?, ?)",
    [id, profileImgUrl, 1],
    (err, result) => {
      if (err) return res.status(401).send(err);

      let query = "UPDATE users SET img = ? WHERE id = ?";
      DB.query(query, [result.insertId, id], (err, result) => {
        if (err) return res.status(401).send(err);
        return res.status(200).send("Updated Successfully.");
      });
    }
  );
}

export function logoutUser(req, res) {
  return res
    .clearCookie("x-auth-token")
    .status(200)
    .send("Logout Successfully..");
}
