var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
//mongoose.connect("mongodb://localhost:27017/TodoApp");
mongoose.connect("mongodb://marc:1050ersers@ds063158.mlab.com:63158/todoapp");

module.exports = {
  mongoose: mongoose
};
