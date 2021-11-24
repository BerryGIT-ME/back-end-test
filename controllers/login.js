import jwt from "jsonwebtoken";

export async function createNewUser(req, res) {
  const { username, password } = req.body;
  const user = { username, password };

  jwt.sign(user, "secretkey", (err, token) => {
    if (err) {
      res.status(500).json({
        message: "Could not generate access token, please try again later",
      });
      return;
    }
    res.status(200).json({ token });
  });
}
