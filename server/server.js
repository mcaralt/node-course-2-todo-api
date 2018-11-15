var {ObjectID} = require("mongodb");
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

app.get("/todos", (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  })
})

app.get("/todos/:id", (req, res) => {

  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(400).send("Invalid id");
  }

  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send("No todo found");
    }
    res.send(todo);
  }, (e) => {
    res.status(400).send(e);
  })
})

app.listen(3000, () => {
  console.log("started on port 3000");
})
