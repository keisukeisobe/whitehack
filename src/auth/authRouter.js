const express = require("express");
const AuthService = require("./authService");

const authRouter = express.Router();
const jsonParser = express.json();

authRouter.post("/auth/login", jsonParser, (req, res, next) => {
  const { username, password } = req.body;
  const loginUser = { username, password };
  const requiredFields = ["username", "password"];
  for (const key of requiredFields) {
    if (!(key in req.body)) {
      return res.status(400).json({
        error: `Missing ${key} in request body`,
      });
    }
  }

  let db = req.app.get("db");

  AuthService.getUserWithUserName(db, loginUser.username)
    .then((dbUser) => {
      if (!dbUser)
        return res.status(400).json({
          error: "Incorrect username or password",
        });
      return AuthService.comparePasswords(
        loginUser.password,
        dbUser.password
      ).then((compareMatch) => {
        if (!compareMatch)
          return res.status(400).json({
            error: "Incorrect username or password",
          });
        const sub = dbUser.username;
        const payload = { user_id: dbUser.login_id };
        res.send({
          authToken: AuthService.createJwt(sub, payload),
          user_id: dbUser.login_id,
        });
      });
    })
    .catch(next);
});

module.exports = authRouter;
