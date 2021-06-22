var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

var UserSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  gender: String,
});
UserSchema.methods.generateHashedPassword = async function () {
  let salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
};
const User = mongoose.model("User", UserSchema);
function validateUser(data) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(10).required(),
    email: Joi.string().email().min(3).max(10).required(),
    password: Joi.string().min(3).max(10).required(),
  });
  return schema.validate(data, { abortEarly: false });
}
module.exports = User;
