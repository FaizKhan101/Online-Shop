exports.getProducts = (req, res, next) => {
    res.render("admin/products/all-products")
}

exports.getNewProduct = (req, res, next) => {
    res.render("admin/products/new-product")
}

exports.createNewProduct = (req, res, next) => {

}