const User = require("../model/user.model");
const authUtil = require("../util/authentication");
const validation = require("../util/validation");

exports.getSignup = (req, res, next) => {
  res.render("customer/auth/signup");
};

exports.signup = async (req, res, next) => {
  const user = new User(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.street,
    req.body.postal,
    req.body.city
  );

  if (
    !validation.userDetailsAreValid(
      req.body.email,
      req.body.password,
      req.body.fullname,
      req.body.street,
      req.body.postal,
      req.body.city
    ) && !validation.emailIsConfirmed(req.body.email, req.body['confirm-emails'])
  ) {
    return redirect("/signup");
  }

  try {
    await user.signup();
  } catch (error) {
    return next(error);
  }
  res.redirect("/login");
};

exports.getLogin = (req, res, next) => {
  res.render("customer/auth/login");
};

exports.login = async (req, res, next) => {
  const user = new User(req.body.email, req.body.password);
  let existingUser;
  try {
    existingUser = await user.getUserWithSameEmail();
  } catch (error) {
    return next(error);
  }

  if (!existingUser) {
    return res.redirect("/login");
  }

  const passwordIsCorrect = await user.hasMathchingPassword(
    existingUser.password
  );

  if (!passwordIsCorrect) {
    return res.redirect("/login");
  }

  authUtil.createUserSession(req, existingUser, () => {
    res.redirect("/");
  });
};

exports.logout = (req, res, next) => {
  authUtil.destroyUserAuthSession(req);
  res.redirect("/login");
};
