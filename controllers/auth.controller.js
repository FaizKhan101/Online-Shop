const User = require("../model/user.model");
const authUtil = require("../util/authentication");
const validation = require("../util/validation");
const sessionFlash = require("../util/session-flash");

exports.getSignup = (req, res, next) => {
  let sessionData = sessionFlash.getSessionData(req);

  if (!sessionData) {
    sessionData = {
      email: "",
      confirmEmail: "",
      fullname: "",
      password: "",
      street: "",
      postal: "",
      city: "",
    };
  }

  res.render("customer/auth/signup", {
    inputData: sessionData,
  });

};

exports.signup = async (req, res, next) => {
  const enteredData = {
    email: req.body.email,
    confirmEmail: req.body["confirm-email"],
    password: req.body.password,
    fullname: req.body.fullname,
    street: req.body.street,
    postal: req.body.postal,
    city: req.body.city,
  };
  if (
    !validation.userDetailsAreValid(
      req.body.email,
      req.body.password,
      req.body.fullname,
      req.body.street,
      req.body.postal,
      req.body.city
    ) &&
    !validation.emailIsConfirmed(req.body.email, req.body["confirm-emails"])
  ) {
    sessionFlash.flashDataToSession(
      req,
      {
        errorMessage: "Invalid inputs - Please try again!",
        ...enteredData,
      },
      () => {
        redirect("/signup");
      } 
      );
    return
  }

  const user = new User(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.street,
    req.body.postal,
    req.body.city
  );

  try {
    const existingUser = await user.existAlready();
    if (existingUser) {
      sessionFlash.flashDataToSession(
        req,
        {
          errorMessage: "Acount with this email already exist!",
          ...enteredData,
        },
        () => {
          res.redirect("/signup");
        }
      );
      return;
    }
    await user.signup();
  } catch (error) {
    return next(error);
  }
  res.redirect("/login");
};

exports.getLogin = (req, res, next) => {
  let sessionData = sessionFlash.getSessionData(req);

  if (!sessionData) {
    sessionData = {
      email: "",
      password: "",
    };
  }

  res.render("customer/auth/login", { inputData: sessionData });
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
    sessionFlash.flashDataToSession(
      req,
      {
        errorMessage: "Invalid input - Please try again!",
        email: user.email,
        password: user.password,
      },
      () => {
        return res.redirect("/login");
      }
    );
  }

  const passwordIsCorrect = await user.hasMathchingPassword(
    existingUser.password
  );

  if (!passwordIsCorrect) {
    sessionFlash.flashDataToSession(
      req,
      {
        errorMessage: "Wrong password!",
        email: user.email,
        password: user.password,
      },
      () => {
        return res.redirect("/login");
      }
    );
  }

  authUtil.createUserSession(req, existingUser, () => {
    res.redirect("/");
  });
};

exports.logout = (req, res, next) => {
  authUtil.destroyUserAuthSession(req);
  res.redirect("/login");
};
