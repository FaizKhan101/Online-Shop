const Order = require("../model/order.model")
const User = require("../model/user.model")

exports.getOrders = (req, res, next) => {
    res.render("customer/orders/all-orders")
}

exports.addOrder = async (req, res, next) => {
    const cart = res.locals.cart;
    let userDocument
    try {
        userDocument = await User.findById(res.locals.uid)
    } catch (error) {
        return next(error)
    }

    const order = new Order(cart, userDocument)
    try {
        await order.save()
    } catch (error) {
        return next(error)
    }
    req.session.cart = null
    res.redirect("/orders")
}