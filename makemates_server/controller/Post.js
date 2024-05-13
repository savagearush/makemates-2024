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
  let query = `SELECT p.id AS postId, u.id, u.name, p.desc, pm.media_url, 
    p.date, pis.image_url AS profileImage FROM posts p JOIN post_media pm 
    ON p.id = pm.post_id JOIN users u ON u.id = p.user_id 
    LEFT JOIN profileimages pis ON u.img = pis.id WHERE p.user_id = ? ORDER BY date DESC;`;

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

export const likeThePost = (req, res) => {
  const { id } = req.user;
  const { postId } = req.body;

  let query = "INSERT INTO likes (`post_id`, `user_id`) VALUES (?, ?)";
  console.log(id, postId);

  DB.query(query, [postId, id], (err, result) => {
    if (err) {
      console.log(err);
    }
    return res.status(200).send(true);
  });
};

export const unLikeThePost = (req, res) => {
  const { id } = req.user;
  const { postId } = req.body;

  console.log(id, postId);
  let query = " DELETE FROM likes WHERE user_id = ? AND post_id = ?";

  DB.query(query, [id, postId], (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
    return res.status(200).send(true);
  });
};

export const checkPostLikeStatus = (req, res) => {
  DB.query(
    "SELECT * FROM likes WHERE user_id = ? AND post_id = ?",
    [req.user.id, req.body.postId],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result.length > 0) {
        return res.status(200).send(true);
      }
      return res.status(200).send(false);
    }
  );
};

export const postNewComment = (req, res) => {
  DB.query(
    "INSERT INTO comments (`user_id`, `post_id`, `desc`) VALUES(?, ?, ?)",
    [req.user.id, req.body.postId, req.body.desc],
    (err, result) => {
      console.log(result);
      if (err) return res.status(400).send(err);
      return res.status(200).send("success");
    }
  );
};

export const getPostComments = (req, res) => {
  console.log(req.params);
  const { postId } = req.params;

  const query =
    "SELECT u.name, u.id, c.desc, c.commentDate FROM comments as c JOIN users as u ON u.id = c.user_id AND c.post_id = ?";

  DB.query(query, [parseInt(postId)], (err, result) => {
    if (err) {
      return res.status(400).send(err);
    }
    console.log(result);
    return res.status(200).send(result);
  });
};
