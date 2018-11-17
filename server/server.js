const {ObjectID} = require("mongodb");
const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const bcrypt = require("bcryptjs");


var {mongoose} = require("./db/mongoose.js");
var {User} = require("./models/user");
var {Todo} = require("./models/todo");
var {authenticate} = require("./middleware/authenticate");

const port = process.env.PORT || 3000;

var app = express();
app.use(bodyParser.json());

app.post("/todos", authenticate, (req, res) => {
  todo = new Todo({
    text : req.body.text,
    _creator: req.user._id
  });

  todo.save().then((result) => {
    res.send(result);
  }, (e) => {
    res.status(400).send(e);
  })
})

app.delete("/todos/:id", authenticate, (req,res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(400).send("Invalid id")
  }

  Todo.findOneAndRemove({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    if (!todo) {
      res.status(404).send("No todo found");
    }

    res.send(todo);
  })
}, (e) => {
    res.status(400).send(e);
})

app.get("/todos", authenticate, (req, res) => {
  Todo.find({
    _creator: req.user._id
  }).then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  })
})

app.get("/todos/:id", authenticate, (req, res) => {

  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(400).send("Invalid id");
  }

  Todo.findOne({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    if (!todo) {
      return res.status(404).send("No todo found");
    }
    res.send(todo);
  }, (e) => {
    res.status(400).send(e);
  })
})

app.patch("/todos/:id", authenticate, (req,res) => {

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

  Todo.findOneAndUpdate({
    _id: id,
    _creator: req.user._id
  }, {$set:body}, {new:true}).then((todo)=>{
    res.send(todo);
  }, (e) => {
    res.status(400).send(e);
  })

});


app.post("/users", (req, res) => {

  var body = _.pick(req.body,["email","password"]);

  var user = new User(body);
  user.save().then(() =>{
    return user.generateAuthToken();
    //res.send(user);
  }, (e)=> {
    res.status(400).send(e);
  }).then((token) => {
    res.header("x-auth",token).send(user);
  })
});


app.post("/users/login", (req,res) => {

  var body = _.pick(req.body,["email","password"]);

  User.findByCredentials(body.email, body.password).then ((user) => {

    return user.generateAuthToken().then((token) => {
      res.header("x-auth",token).send(user);
    })

  }). catch((e) => {
    console.log(e);
    res.status(401).send();
  })

})

app.get("/users/me" , authenticate, (req,res) => {
  res.send(req.user);
});

app.delete("/users/me/token", authenticate, (req,res) => {
  req.user.removeToken(req.token).then (() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  })
})


app.listen(port, () => {
  console.log(`started on port ${port}`);
})
