import DB from "../db/db.js";

export const getUserProfile = (req, res) => {
  const userId = req.body.id;

  const query1 = `SELECT u.id, u.name, u.email, u.gender, u.dob, pi.image_url from users u LEFT JOIN profileimages pi ON pi.user_id = u.id WHERE u.id=? LIMIT 1;`;
  
  DB.query(query1, [userId], (err, result) => {
    if (err) return res.status(401).send(err);

    if (result.length > 0) {
      const userData = result[0];

      let query2 = `SELECT p.id AS postId, u.id, u.name, p.desc, pm.media_url, 
        p.date, pis.image_url AS profileImage FROM posts p JOIN post_media pm 
        ON p.id = pm.post_id JOIN users u ON u.id = p.user_id 
        LEFT JOIN profileimages pis ON u.img = pis.id WHERE p.user_id = ? ORDER BY date DESC;`;

      DB.query(query2, [userId], (err, result) => {
        if (err) return res.status(401).send(err);
        return res.status(200).send({ userData, userPost: result });
      });
    } else {
      return res.status(204).send("User not Found");
    }
  });

};

export const checkFollowed = (req, res) => {
  console.log(req.body);
  const { friendId } = req.body;
  const userId = req.user.id;
  DB.query(
    "SELECT * FROM relationships WHERE follower_id = ? AND follow_id = ?",
    [userId, friendId],
    (err, result) => {
      if (err) return res.status(401).send(err);
      if (result.length > 0) {
        return res.status(200).send("USER_FOUND");
      } else {
        return res.status(200).send("USER_NOT_FOUND");
      }
    }
  );
};

export const searchUser = (req, res) => {
  const { keyword } = req.body;

  let query = `SELECT u.id, u.name, u.city, pis.image_url AS profileImage FROM users u LEFT JOIN profileimages pis ON u.img = pis.id WHERE name LIKE ?`;

  DB.query(query, [`%${keyword.toLowerCase()}%`], (err, result) => {
    if (err) return res.status(401).send(err);
    return res.status(200).send(result);
  });
};
