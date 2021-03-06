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
// app.use(bodyParser.json())

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
  // console.log(req);
  // console.log(req.body);
  var newId = foods[foods.length - 1].id + 1;
  var newFood = {
    id: newId,
    name: req.body.name,
    yumminess: req.body.yumminess
  };

  foods.push(newFood);
  res.json(newFood);
})

app.delete("/foods/:id", function (req, res) {
  console.log("hitting delete route");
  // finding an object with id = req.body.id out of the foods
  // remove item from array
  // render deleted object
  // console.log(req.params.id);
  var selectedFood;
  for(i = 0; i < foods.length; i++) {
    if(Number(req.params.id) === foods[i].id){selectedFood = i};
  }
  // console.log(selectedFood);
  selectedFood = foods.splice(selectedFood, 1);
  res.json(selectedFood);
})

// listen on port 3000
app.listen(3000, function (){
  console.log("listening on port 3000")
})