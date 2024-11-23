const adminAuth = (req, res, next) => {
  const token = "xyz";
  const isAuthorized = token === "xyz";
  if (isAuthorized) {
    next();
  } else {
    res.status(401).send("unAuthorized accsess !");
  }
};

const userAuth = (req, res, next) => {
  const token = "xyzdd";
  const isAuthorized = token === "xyzsfsfx";
  if (isAuthorized) {
    next();
  } else {
    res.status(401).send("unAuthorized accsess !");
  }
};

module.exports = { adminAuth, userAuth };
