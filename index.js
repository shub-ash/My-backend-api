// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const routes = require("./routes/routes");
// const users = require("./routes/users");
// const todo = require("./routes/todo");
// const products = require("./routes/products");
// const post = require("./routes/post");

// const app = express();

// // ✅ Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // ✅ MongoDB
// mongoose.connect(process.env.DATABASE_URL);
// const database = mongoose.connection;
// database.on("error", (error) => console.log(error));
// database.once("connected", () => console.log("Database Connected"));

// // ✅ Routes
// app.use("/api", routes);

// app.use("/api/users", users);

// app.use("/api/todo", todo);

// app.use("/api/products", products);

// app.use("/post", post);

// // ✅ Start Server
// app.listen(3000, () => console.log("Server Started at 3000"));

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { swaggerUi, swaggerSpec } = require("./swagger");
const fs = require("fs");
const swaggerDocument = JSON.parse(fs.readFileSync("./swagger.json"));

// 🔥 REGISTER MODELS (VERY IMPORTANT)
require("./model/user");
require("./model/posters");

const routes = require("./routes/routes");
const users = require("./routes/users");
const todo = require("./routes/todo");
const products = require("./routes/products");
const post = require("./routes/post");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    tlsAllowInvalidCertificates: true,
    tls: true,
  })
  .then(() => {
    console.log("✔ MongoDB Connected (Render)");
  });
const database = mongoose.connection;
database.on("error", (error) => console.log(error));
database.once("connected", () => console.log("Database Connected"));

// Routes
app.use("/api/todo", todo);
app.use("/api/products", products);
app.use("/api/users", users);
app.use("/post", post);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start Server
app.listen(3000, () => console.log("Server Started at 3000"));
