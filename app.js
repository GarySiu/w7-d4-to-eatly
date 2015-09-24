// REQUIREMENTS //
var express = require('express')
var app = express()
var path = require('path')
var bodyParser = require('body-parser')

// CONFIG //

// serve js & css files into a public folder
app.use(express.static(__dirname + '/public'))

// body parser config
app.use(bodyParser.urlencoded({ extended: true }))

// DATA //

// pre-seeded food data
var foods =[
  {id: 0, name: "Sushiritto", yumminess: "quite"},
  {id: 1, name: "Green Eggs & Ham", yumminess: "sure"},
  {id: 2, name: "Crayfish", yumminess: "depending"},
  {id: 3, name: "Foie Gras", yumminess: "omg"},
  {id: 4, name: "Kale", yumminess: "meh"}
]

// ROUTES //

// root path
app.get("/", function (req, res) {
  // render index.html
  res.sendFile(path.join(__dirname + '/public/views/index.html'))
})

// foods index path
app.get("/foods", function (req, res) {
  // render foods index as JSON
  res.json(foods);
})

app.post("/foods", function (req, res) {
  // add a unique id
  // add new food to DB (array, really...)
  // send a response with newly created object
  // console.log('You have hit the correct route.')
  // console.log(req.params);
  console.log(req.body);
  var foodIds = [];
  foods.forEach(function(food){
     foodIds.push(food.id);
  });
  var newId = Math.max.apply(null, foodIds) + 1;
  var newFood = {};
  newFood.id = newId;
  newFood.name = req.body.name;
  newFood.yumminess = req.body.yumminess;
  foods.push(newFood);
  res.json(foods);
})

app.delete("/foods/:id", function (req, res) {
  console.log("hitting delete route");
  // finding an object with id = req.body.id out of the foods
  // remove item from array
  // render deleted object
})

// listen on port 3000
app.listen(3000, function (){
  console.log("listening on port 3000")
})