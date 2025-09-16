const mongoDb = require("mongodb")

const MongoClient = mongoDb.MongoClient

let database;

async function connectToDatabase() {
    try {
        const client = await MongoClient.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        database = client.db();
    } catch (error) {
        throw new Error("Failed to connect to the database: " + error.message);
    }
}

function getDb() {
    if (!database) {
        throw new Error("You must connect first!")
    }
    return database
}

module.exports = {
    connectToDatabase: connectToDatabase,
    getDb: getDb
}
