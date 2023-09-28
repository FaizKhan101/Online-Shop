const express = require("express")

const ordersController = require("../controllers/orders.controller")

const router = express.Router()

router.get("/", ordersController.getOrders)

router.post("/", ordersController.addOrder) // /orders

router.get("/success", ordersController.getSuccess)

router.get("/cancel", ordersController.getCancel)

module.exports = router 