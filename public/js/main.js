// did I screw up linking the file?
console.log('Hello world!');

// ready to roll!
$(document).ready(function(){
// declarations
  $foodList = $('#food-list');
  $addFoodForm= $('#add-food-form');
// event listners
  setListeners();
// first ajax request to index foods
  $.ajax({
    url: "/foods"
  }).done(function(data){
    render(data);
  });
})

function setListeners(){
  $addFoodForm.on('submit', addFood)
}

function render(data){
  $foodList.empty();
  $.each(data, function(i, food){
    $foodList.append('<div>' + food.name + ' - ' + food.yumminess +'</div>')
  })
}

function addFood(){
  event.preventDefault();
  var newFood = {
    name: $('#name').val(),
    yumminess: $('#yumminess').val()
  };
// clear out the old values now that they're saved
  $('#name').val('');
  $('#yumminess').val('');

  console.log(newFood);
}