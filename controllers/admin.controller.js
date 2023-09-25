const Product = require("../model/product.model");

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.render("admin/products/all-products", { products });
  } catch (error) {
    return next(error);
  }
};

exports.getNewProduct = (req, res, next) => {
  res.render("admin/products/new-product");
};

exports.createNewProduct = async (req, res, next) => {
  const product = new Product({
    ...req.body,
    image: req.file.filename,
  });
  try {
    await product.save();
  } catch (error) {
    return next(error);
  }
  res.redirect("/admin/products");
};

exports.getUpdateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.render("admin/products/update-product", { product });
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  
  const product = new Product({
    ...req.body,
    _id: req.params.id,
  });

  if (req.file) {
    await product.replaceImage(req.file.filename);
  }
  try {
    await product.save();
  } catch (error) {
    return next(error);
  }
  res.redirect("/admin/products");
};
