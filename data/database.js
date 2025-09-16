const mongoDb = require("mongodb")

const MongoClient = mongoDb.MongoClient

let database;

async function connectToDatabase() {
    try {
        const client = await MongoClient.connect('mongodb+srv://FaizKhan:faizkhan8225@cluster0.3iavjwf.mongodb.net/WDE-shop?retryWrites=true&w=majority&appName=Cluster0', {
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
