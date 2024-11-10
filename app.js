const express = require("express");
const connectDB = require("./db/connect");
const notFound = require("./middleware/not-found");
const productRouter = require("./routes/products");
const errorHandler = require("./middleware/error-handler");

require("dotenv").config();
require("express-async-errors");

const app = express();

// middelware
app.use(express.json());

// routes
app.use("/api/v1/products", productRouter);
app.use(notFound);

// error handler
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    console.log("db connected!!!");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on ${process.env.PORT}`);
    });
  } catch (error) {
    console.log("Something went wrong");
  }
};

start();
