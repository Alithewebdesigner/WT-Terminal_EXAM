var mongoose = require("mongoose");
const Joi = require("@hapi/joi");
var productSchema = mongoose.Schema({
  name: String,
  price: String,
  description: String,
  rating: String,
});
const Product = mongoose.model("Product", productSchema);
function validateProduct(data) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(10).required(),
    price: Joi.number().min(0).required(),
    description: Joi.required(),
    rating: Joi.required(),
  });
  return schema.validate(data, { abortEarly: false });
}
module.exports = Product;
module.exports.validate = validateProduct;
