var {ObjectID} = require("mongodb");
var express = require("express");
var bodyParser = require("body-parser");
var _ = require("lodash");

var {mongoose} = require("./db/mongoose.js");
var {User} = require("./models/user");
var {Todo} = require("./models/todo");

const port = process.env.PORT || 3000;

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

app.delete("/todos/:id", (req,res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(400).send("Invalid id")
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      res.status(404).send("No todo found");
    }

    res.send(todo);
  })
}, (e) => {
    res.status(400).send(e);
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

app.patch("/todos/:id", (req,res) => {

  var id = req.params.id;
  var body = _.pick(req.body,["text","completed"]);

  if (!ObjectID.isValid(id)) {
    return res.status(400).send("Invalid id");
  }

  //todo what happens if there's no data to update sent to the server?
  //if (body.length == 0) res.status(400).send("No updates sent to the server");

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completedAt = null;
    body.completed=false;
  }

  Todo.findByIdAndUpdate(id, {$set:body}, {new:true}).then((todo)=>{
    res.send(todo);
  }, (e) => {
    res.status(400).send(e);
  })

});


app.listen(port, () => {
  console.log(`started on port ${port}`);
})
