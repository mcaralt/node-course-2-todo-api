var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/TodoApp")

// var Todo = mongoose.model("Todo",{
//   text: {
//     type: String,
//     required: true,
//     minlength: 1,
//     trim: true
//   },
//   completed: {
//     type: Boolean,
//     default: false
//   },
//   completedAt: {
//     type: Number,
//     default: null
//   }
// });
//
// var newTodo = new Todo({
//   text: "Edit this video",
// });
//
// newTodo.save().then((doc) => {
//   console.log("data saved", doc);
// }, (e) => {
//   console.log(e);
// })

var User = mongoose.model("User",{
  email: {
  type: String,
  requiered: true,
  minlength:1,
  trim: true
}
});

var newUser = new User({
  email: "marc@gmail.com"
});

newUser.save().then((doc) => {
  console.log("User saved", doc);
}, (e) => {
  console.log(e);
});
