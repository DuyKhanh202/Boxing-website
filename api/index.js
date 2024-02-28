const express = require("express");
const cors = require('cors')
const app = express();
const port = 8080;
const ProductsRouter = require('./routes/products');
const UserRouter = require('./routes/users');
const OrderRouter = require('./routes/orders');
const path = require('path');

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.get("/", (req, res) => {
  res.json({ message: "ok" });
});


app.use("/api/product", ProductsRouter);
app.use("/api/user", UserRouter);
app.use("/api/order", OrderRouter);

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});