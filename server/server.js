var express = require("express");
var bodyParser = require("body-parser");

var {mongoose} = require("./db/mongoose.js");
var {User} = require("./models/user");
var {Todo} = require("./models/todo");

var app = express();
app.use(bodyParser.json());

app.post("/todos", (req, res) => {
  todo = new Todo({
    text : req.body.text
  });

  todo.save().then((result) => {
    res.send(result);
  }, (e) => {
    res.status(400).send(e);
  })
})

app.listen(3000, () => {
  console.log("started on port 3000");
})
