const expressSession = require("express-session")
const mongoDbStore =  require("connect-mongodb-session")

function createSessionStore() {
    const MongoDBStore = mongoDbStore(expressSession)

    const store = new MongoDBStore({
        uri: "mongodb://localhost:27017",
        databaseName: "online-shop",
        collection: "sessions"
    })

    return store
}

function createSessionConfig() {
    return {
        secret: 'super-secret',
        resave: false,
        saveUninitialized: false,
        store: createSessionStore(),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24
        }
    }
}

module.exports = createSessionConfig