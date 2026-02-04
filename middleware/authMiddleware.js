const protect = (req, res, next) => {
  const { isAuth, user } = req.session;

  if (isAuth) {
    req.user = user;
    next();
  } else {
    res.status(401).json({
      status: "fail",
      message: "Not authorized",
    });
  }
};

module.exports = protect;
