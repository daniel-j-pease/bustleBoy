//do you see

console.log('app.js connected!');
var sprite = $('#sprite');
var timeElapsed = 0;
var health = 3;
var speed;
var score = 0;
var paused = false;
var currentPlayer = 'Player 1';

function divMaker() {

}

// function onStart() {
  var timer = setInterval(function() {
  if (!paused) {
    timeElapsed++;
    if(timeElapsed < 10) {
      console.log('level1');
      speed = 100;
      if (timeElapsed % 5 === 0) {
        tableMaker();
      } else if (timeElapsed % 3 === 0 ) {
        chairMaker();
      }
    } else if(timeElapsed < 15) {
      console.log('level2');
      speed = 75;
      if (timeElapsed % 5 === 0) {
        tableMaker();
      } else if (timeElapsed % 2 === 0 ) {
        chairMaker();
      }
    } else if(timeElapsed < 20) {
      console.log('level3');
      speed = 50;
      if (timeElapsed % 3 === 0) {
        tableMaker();
      } else if (timeElapsed % 1 === 0 ) {
        chairMaker();
      }
    } else if(timeElapsed < 35) {
      console.log('level4');
      speed = 25;
      if (timeElapsed % 2 === 0) {
       tableMaker();
      } else if (timeElapsed % .5 === 0 ) {
       chairMaker();
       chairMaker();
      }
    } else {
      speed = 20;
      if (timeElapsed % 2 === 0) {
        tableMaker();
      } else if (timeElapsed % .25 === 0 ) {
        chairMaker();
        chairMaker();
        chairMaker();
      }
    }
  }
}, 1000);

  var mover = setInterval(function () {
    if(!paused) {
      $('.enemy').animate({left: '-=10'}, speed, 'linear', checker)
      $('#score').html(Math.floor(score));
      $('#health').html(Math.floor(health));
      $('#currentPlayer').html(currentPlayer);
      score += .25;
    } else {
      clearInverval(mover);
    }
  }, 10)
// }


function checker() {

  var spriteLeft = $('#sprite').position().left;
  var spriteTop = $('#sprite').position().top;
  var enemyLeft = $(this).position().left;
  var enemyTop = $(this).position().top;

  if (
    spriteLeft < enemyLeft + $(this).width() &&
    enemyLeft < spriteLeft + $('#sprite').width() &&
    spriteTop < enemyTop + $(this).height() &&
    enemyTop < spriteTop + $('#sprite').height()
    ) {
    health-=1;
    console.log('contact');
    $(this).remove();
  }
  if($(this).position().left < -100) {
    score +=25;
    $(this).remove();
  }
}

function chairMaker() {
  var foe = $('<div>').attr('class', 'enemy '+ timeElapsed);
  foe.css({top: (Math.floor(Math.random()*630)), left:  $(window).innerWidth()-70})
  $('#container').append(foe);
  return foe;
}

function allyMaker() {
  var ally = $('<div>').attr('class', 'friend '+ timeElapsed);
  // ally.css({top: (Math.floor(Math.random()*500))})
}

function tableMaker() {

  var checker = Math.random();

  if (checker < (1/3)) {
    makeBot(9);
    // makeTop(4);
  } else if (checker <(2/3)) {
    makeBot(9);
    // makeTop(4);
  } else {
    // makeTop(4);
    makeBot(4);
  }

  function makeTop(proportion) {
    var tableTop = $('<div>').attr('class', 'enemy table ' + timeElapsed);
    var topFlex = Math.floor(Math.random()*(($('#container').height()/proportion)));
    tableTop.css({
      left: $(window).innerWidth()-100,
      top: $('#scoreboard').height(),
      height: ($('#container').height())/2 - (($('#container').height())/60  +  topFlex)
    })
    $('#container').append(tableTop);
    return tableTop;
  }

  function makeBot(proportion) {
    var tableBot = $('<div>').attr('class', 'enemy table ' + timeElapsed);
    var botFlex = Math.floor(Math.random()*(($('#container').height()/proportion)));
    tableBot.css({
      left: $(window).innerWidth()-100,
      height: 200,
      bottom: -33,
      })
    $('#container').append(tableBot);
    return tableBot;
  }
}

function pauser (e) {
  if (e.keyCode === 80) {
    paused = true;
    $('.enemy').clearQueue();
  } else if (e.keyCode === 32) {
    paused = false
  }
}

function busControls (e) {

  var busLeft = sprite.position().left;
  var busRight = sprite.position().left + sprite.width();
  var busTop = sprite.position().top;
  var busBottom = sprite.position().top + sprite.height();

  if (busRight < ($('#field').width()) && e.keyCode === 39) {

    //right
    sprite.animate({left: '+=15px'}, 100);
  } else if (busLeft > 8 && e.keyCode === 37) {

    //left
    sprite.animate({left: '-=15px'}, 100);
  } else if (busTop > 10 && e.keyCode === 38) {

    //up
    sprite.animate({top: '-=15px'}, 100);
  } else if (busBottom < $('#field').height() && e.keyCode === 40) {

    //down
    sprite.animate({top: '+=15px'}, 100);
  }
}

function blinker() {
  $(this).fadeOut('slow', 'linear');
  $(this).fadeIn('slow', 'linear', blinker);
}

function playerNum() {
  $(document).ready(onStart);
  console.log('yo')
}

$(document).keyup(busControls);
$(document).keydown(pauser);

$('.option').click(playerNum);
$('.option').mouseover(blinker);
$('.option').mouseleave(function() {
  $(this).stop(true);
});
