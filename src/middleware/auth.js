const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const usernameCfg = process.env.USERNAME || "1";
  const passwordCfg = process.env.PASSWORD || "1";
  if (authHeader) {
    const auth = Buffer.from(authHeader.split(" ")[1], "base64")
      .toString()
      .split(":");
    const username = auth[0];
    const password = auth[1];
    if (username === usernameCfg && password === passwordCfg) {
      return next();
    }
  }
  res.status(401).send("Authentication required");
};

module.exports = authenticate;
