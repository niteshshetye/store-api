const express = require("express");
const {
  getAllProduct,
  getAllProductStatics,
} = require("../controllers/products");

const router = express.Router();

router.route("/").get(getAllProduct);
router.route("/static").get(getAllProductStatics);

module.exports = router;
