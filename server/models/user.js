const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const _ = require("lodash");


var UserSchema = new mongoose.Schema({
  email: {
  type: String,
  requiered: true,
  minlength:1,
  trim: true,
  unique: true,
  validator: {
    validate: (value)=> {
      return validator,isEmail(value);
    },
    message: "{VALUE} is not  avalid email"
  },
  },
  password: {
    type: String,
    require: true,
    minlength:6
  },
  tokens: [{
    access: {
      type: String,
      require: true
    },
    token: {
      type: String,
      require: true
    }
  }]
});

UserSchema.methods.toJSON = function () {
  var userObject = this.toObject();
  return _.pick(userObject,["_id" , "email"]);
}

UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = "auth";
  var token = jwt.sign(user._id + "123abc", access);
  user.tokens.push({access,token});

  return user.save().then(() => {
    return token;
  })
}

var User = mongoose.model("User", UserSchema);


module.exports = {
  User : User
};
