console.log('Hello world!');
$.ajax({
  url: "/foods",
}).done(function(data) {
  console.log(data)
});