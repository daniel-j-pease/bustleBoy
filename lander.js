console.log('lander');

$('#1player').click(something)
$('.option').mouseover(blinker)
$('.option').mouseleave(function() {
  $(this).stop(true);
});

function blinker() {
  $(this).fadeOut('slow', 'linear');
  $(this).fadeIn('slow', 'linear', blinker);
}

function something() {
  console.log('1 player');
}
