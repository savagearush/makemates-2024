import DB from "../db/db.js";

export const addPost = (req, res) => {
  const { desc, imgUrl } = req.body;

  DB.query(
    "INSERT INTO posts (`user_id`, `desc`) VALUES (?, ?)",
    [req.user.id, desc],
    (err, result) => {
      if (err) return res.status(500).send(err);

      DB.query(
        "INSERT INTO post_media (`post_id`, `media_url`, `user_id`) VALUES (?, ?, ?)",
        [result.insertId, imgUrl, req.user.id],
        (err, result) => {
          if (err) return res.status(500).send(err);
          if (result) {
            return res.status(200).send("Post uploaded...");
          }
        }
      );
    }
  );
};

export const getUserPosts = (req, res) => {
  const { id } = req.user;
  let query =
    "SELECT u.id, u.name, p.desc, pm.media_url, p.date, pis.image_url AS profileImage FROM posts p JOIN post_media pm ON p.id = pm.post_id JOIN users u ON u.id = p.user_id LEFT JOIN profileimages pis ON u.img = pis.id WHERE p.user_id = ? ORDER BY date DESC;";

  if (id !== "" || id !== undefined || id !== null) {
    DB.query(query, [id], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      } else {
        return res.status(200).send(result);
      }
    });
  }
};
