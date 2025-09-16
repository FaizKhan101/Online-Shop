const expressSession = require("express-session")
const mongoDbStore =  require("connect-mongodb-session")

function createSessionStore() {
    const MongoDBStore = mongoDbStore(expressSession)

    const store = new MongoDBStore({
        uri: "mongodb+srv://FaizKhan:faizkhan8225@cluster0.3iavjwf.mongodb.net/WDE-shop?retryWrites=true&w=majority&appName=Cluster0",
        databaseName: "WDE-shop",
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