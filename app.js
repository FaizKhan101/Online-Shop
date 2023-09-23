const path = require("path");

const express = require("express");

const authRoutes = require("./routes/auth.routes");
const db = require("./data/database");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));

app.use(authRoutes);

db.connectToDatabase()
  .then(() => {
    app.listen(3000, () => console.log("Server start at port 3000!"));
  })
  .catch((err) => {
    console.log("Failed to connect to the database!");
    console.log(err);
  });
