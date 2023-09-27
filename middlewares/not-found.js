function notFoundError(req, res, next) {
    res.render("shared/404")
}

module.exports = notFoundError