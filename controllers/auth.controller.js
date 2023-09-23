const User = require("../model/user.model")
const authUtil = require("../util/authentication")

exports.getSignup = (req, res, next) => {
    res.render("customer/auth/signup")
}

exports.signup = async (req, res, next) => {
    const user = new User(
        req.body.email,
        req.body.password,
        req.body.fullname,
        req.body.street,
        req.body.postal,
        req.body.city
    )
    await user.signup()
    res.redirect("/login")
}

exports.getLogin = (req, res, next) => {
    res.render("customer/auth/login")
}

exports.login = async (req, res, next) => {
    const user = new User(req.body.email, req.body.password)
    const existingUser = await user.getUserWithSameEmail()

    if (!existingUser) {
        return res.redirect("/login")
    }

    const passwordIsCorrect = await user.hasMathchingPassword(existingUser.password)

    if (!passwordIsCorrect) {
        return res.redirect("/login")
    }

    authUtil.createUserSession(req, existingUser, () => {
        res.redirect("/")
    })
}

exports.logout = (req, res, next) => {
    authUtil.destroyUserAuthSession(req)
    res.redirect("/login")
}