const express = require("express")

const router = express.Router()

router.get("/", (req, res, next) => {
    res.redirect("/products")
})

router.get("/401", (req, res, next) => {
    res.status(401).render("shared/401")
})

router.get("/403", (req, res, next) => {
    res.status(403).render("shared/403")
})

module.exports = router