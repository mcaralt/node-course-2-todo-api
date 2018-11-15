var mongoose = require("mongoose");

var User = mongoose.model("User",{
  email: {
  type: String,
  requiered: true,
  minlength:1,
  trim: true
}
});


module.exports = {
  User : User
};
