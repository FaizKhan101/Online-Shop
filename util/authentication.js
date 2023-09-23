function createUserSession(req, user, action) {
    req.session.uid = user._id.toString()
    req.session.save(action)
    next()
}

module.exports = {
    createUserSession: createUserSession
}