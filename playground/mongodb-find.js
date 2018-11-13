const {MongoClient,ObjectID} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err,client) => {
  if (err) {
    return console.log("Unable to connect to MongoDB server");
  }
  console.log("Connected to MongoDB server");

  const db = client.db("TodoApp");

  // db.collection("Todos").find({_id: new ObjectID("5beb2cee106fec0744657ce2")}).toArray().then((result) => {
  //   console.log(JSON.stringify(result,undefined,2));
  // }, (err) => {
  //   console.log("unable to fetch results");
  // })

  // db.collection("Todos").find().count().then((result) => {
  //   console.log("count:", result);
  // }, (err) => {
  //   console.log("unable to fetch results");
  // })

  db.collection("Users").find({user:"Mike"}).toArray().then((result) => {
    console.log(JSON.stringify(result,undefined,2));
  }, (e) => {
    console.log ("Unable to find any matches");
  })

  client.close();
})
