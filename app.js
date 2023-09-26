const path = require("path");

const express = require("express");
const csrf = require("csurf")
const expressSession = require("express-session")

const createSessionConfig = require("./config/session")
const baseRoutes = require("./routes/base.routes")
const authRoutes = require("./routes/auth.routes");
const productsRoutes = require("./routes/products.routes")
const adminRoutes = require("./routes/admin.routes")
const db = require("./data/database");
const addCsrfTokenMiddleware = require("./middlewares/csrf-token")
const errorHandlerMiddleware = require("./middlewares/error-handler")
const checkAuthStatusMiddleware = require("./middlewares/check-auth")
const protectRoutesMiddleware = require("./middlewares/protect-routes")
const cartMiddleware = require("./middlewares/cart")

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use("/admin/products/assets", express.static("product-data"))
app.use(express.urlencoded({extended: false}))

const sessionConfig = createSessionConfig()

app.use(expressSession(sessionConfig))

app.use(csrf())
app.use(cartMiddleware)

app.use(addCsrfTokenMiddleware)
app.use(checkAuthStatusMiddleware)

app.use(baseRoutes)
app.use(authRoutes);
app.use(productsRoutes)
app.use(protectRoutesMiddleware)
app.use("/admin", adminRoutes)

app.use(errorHandlerMiddleware)

db.connectToDatabase()
  .then(() => {
    app.listen(3000, () => console.log("Server start at port 3000!"));
  })
  .catch((err) => {
    console.log("Failed to connect to the database!");
    console.log(err);
  });
