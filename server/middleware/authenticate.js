var {User} = require("./../models/user.js");

var authenticate = (req, res, next) => {
  User.findByToken(req.header("x-auth")).then((user) => {

    if (!user) Promise.reject();

    req.user = user;
    req.token = req.header("x-auth");
    next();

  }).catch((e) => {
    res.status(401).send();
  })
}

module.exports = {authenticate};
