const Product = require("../model/product.model")

exports.getProducts = async (req, res, next) => {
    try {
        const products = await Product.findAll()
        res.render("customer/products/all-products", { products: products });
    } catch (error) {
        next(error)
    }
};
