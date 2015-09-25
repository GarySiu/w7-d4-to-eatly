// did I screw up linking the file?
console.log('Hello world!');
var endpoint = '/foods'
// ready to roll!
$(document).ready(function(){
// declarations
  $foodList = $('#food-list');
  $addFoodForm = $('#add-food-form');
// event listners
  setListeners();
// first ajax request to index foods
  $.get(endpoint)
  .done(function(data){
    render(data);
  });
})

function setListeners(){
  $addFoodForm.on('submit', addFood);
  $('body').on('click', '.delete', deleteFood);
}

function render(data){
  $foodList.empty();
  $.each(data, function(i, food){
    $foodList.append('<div class="results"><a class="pure-button pure-button-error delete" data-id="'+ food.id +'">X</a><span class="results-text">' + food.name + '</span><span class="pure-badge-info">' + food.yumminess +'</span></div>')
  })
}

function addFood(){
  event.preventDefault();
  var newFood = $addFoodForm.serialize();

// clear out the old values now that they're saved
  $('#name').val('');
  $('#yumminess').val('');

  $.post(endpoint, newFood)
  .done(function(response){
    $foodList.append('<div class="results"><a class="pure-button pure-button-error delete" data-id="'+ response.id +'">X</a><span class="results-text">' + response.name + '</span><span class="pure-badge-info">' + response.yumminess +'</span></div>')
  });
}

function deleteFood(){
  element = $(this);
  $.ajax({
    url: endpoint + '/' + element.data('id'),
    method: 'delete'
  })
  .done(function(response){
    element.parent().fadeOut(400, $.remove)
  })
}