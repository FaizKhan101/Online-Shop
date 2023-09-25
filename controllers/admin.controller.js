exports.getProducts = (req, res, next) => {
    res.render("admin/products/all-products")
}

exports.getNewProduct = (req, res, next) => {
    res.render("admin/products/new-product")
}

exports.createNewProduct = (req, res, next) => {
    console.log({body: req.body});
    console.log({file: req.file});
    res.redirect("/admin/products")
}