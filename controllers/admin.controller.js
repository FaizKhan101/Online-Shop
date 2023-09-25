const Product = require("../model/product.model")

exports.getProducts = (req, res, next) => {
    res.render("admin/products/all-products")
}

exports.getNewProduct = (req, res, next) => {
    res.render("admin/products/new-product")
}

exports.createNewProduct = async (req, res, next) => {
    const product = new Product({
        ...req.body,
        image: req.file.filename
    })
    try {
        await product.save()
    } catch (error) {
        return next(error)
    }
    res.redirect("/admin/products")
}