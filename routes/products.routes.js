const express = require("express")

const productsController = require("../controllers/products.controller")

const router = express.Router()

router.get("/products", productsController.getProducts)

module.exports = router