var mongoose = require("mongoose");
var yargs = require("yargs");

var mongodb_url = "mongodb://marc:1050ersers@ds063158.mlab.com:63158/todoapp";
if (yargs.argv._[0]) mongodb_url = "mongodb://localhost:27017/TodoApp";

console.log("connecting to:",mongodb_url);

mongoose.Promise = global.Promise;
//mongoose.connect("mongodb://localhost:27017/TodoApp");
mongoose.connect(mongodb_url);

module.exports = {
  mongoose: mongoose
};
