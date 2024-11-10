require("dotenv").config();
const connectDB = require("./db/connect");
const { ProductModal } = require("./models/product");
const productsJson = require("./products.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    await ProductModal.deleteMany();
    await ProductModal.create(productsJson);
    console.log("success!!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
