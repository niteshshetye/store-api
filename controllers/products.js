const { ProductModal } = require("../models/product");

const operatorMap = {
  "<": "$lt",
  "<=": "$lte",
  "==": "$eq",
  ">": "$gt",
  ">=": "$gte",
};
const options = ["price", "rating"];
const regEx = /\b(<|<=|==|>=|>)\b/g;

const getAllProductStatics = async (req, res) => {
  const products = await ProductModal.find({ featured: true });

  res
    .status(200)
    .json({ success: true, data: products, count: products.length });
};

const getAllProduct = async (req, res) => {
  const {
    featured,
    company,
    name,
    sort,
    fields,
    page = 1,
    limit = 10,
    numFilters,
  } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  if (numFilters) {
    let filters = numFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    filters.split(",").forEach((filter) => {
      const [field, operator, value] = filter.split("-");
      const valueInNum = Number(value);
      if (options.includes(field) && !isNaN(valueInNum)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  let result = ProductModal.find(queryObject);

  if (sort) {
    const sortString = sort.split(",").join("");
    result = result.sort(sortString);
  } else {
    result = result.sort("createdAt");
  }

  if (fields) {
    const fieldsString = fields.split(",").join("");
    result = result.select(fieldsString);
  }

  // pagination
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  const products = await result;
  res
    .status(200)
    .json({ success: true, data: products, count: products.length });
};

module.exports = {
  getAllProduct,
  getAllProductStatics,
};
