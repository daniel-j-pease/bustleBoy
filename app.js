console.log('app.js connected!');
var sprite = $('#sprite');
var timeElapsed = 0;
var health = 5;
var speed;
var score = 0;
var paused =  true;
var nickname = (window.location.search).slice(10).toUpperCase();

  if(nickname) {
    $('#pauseScreen').hide();
    $('#final').hide();
    paused = false;
    if(nickname.length > 0) {
      $('#message').html(nickname + '! STOP LEANIN\' AND START CLEANIN\'!')
    } else {
      $('#message').html('HEY NEW GUY! GET TO WORK!')
    }
  }

  var timer = setInterval(function() {
  if (!paused) {
    timeElapsed++;
    if(timeElapsed < 30) {
      console.log('level1');
      speed = 100;
      if (timeElapsed % 5 === 0) {
        tableMaker();
      } else if (timeElapsed % 3 === 0 ) {
        chairMaker();
      } else if (timeElapsed % 11 === 0) {
        plateMaker()
      }
    } else if(timeElapsed < 50) {
      console.log('level2');
      speed = 75;
      if (timeElapsed % 5 === 0) {
        tableMaker();
      } else if (timeElapsed % 2 === 0 ) {
        chairMaker();
      } else if (timeElapsed % 10 === 0) {
        plateMaker()
      }
    } else if(timeElapsed < 70) {
      console.log('level3');
      speed = 50;
      if (timeElapsed % 3 === 0) {
        tableMaker();
      } else if (timeElapsed % 1 === 0 ) {
        chairMaker();
      } else if (timeElapsed % 9 === 0) {
        plateMaker()
      }
    } else if(timeElapsed < 90) {
      console.log('level4');
      speed = 25;
      if (timeElapsed % 2 === 0) {
       tableMaker();
      } else if (timeElapsed % .5 === 0 ) {
       chairMaker();
       chairMaker();
      } else if (timeElapsed % 8 === 0) {
        plateMaker()
      }
    } else {
      speed = 20;
      if (timeElapsed % 2 === 0) {
        tableMaker();
      } else if (timeElapsed % .25 === 0 ) {
        chairMaker();
        chairMaker();
        chairMaker();
      } else if (timeElapsed % 7 === 0) {
        plateMaker();
      }
    }
  }
}, 1000);

  var mover = setInterval(function () {
    if(!paused) {
      $('.enemy').animate({left: '-=10'}, speed, 'linear', checker)
      $('.friend').animate({left: '-=10'}, speed, 'linear', checker)
      $('#score1').html('SCORE: ' + Math.floor(score));
      $('#health1').html('HEALTH: ' + health);
      $('#time1').html('TIME: ' + timeElapsed);
      score += .25;
    } else {
      clearInverval(mover);
    }
  }, 10)

function checker() {

  var spriteLeft = $('#sprite').position().left;
  var spriteTop = $('#sprite').position().top;
  var objLeft = $(this).position().left;
  var objTop = $(this).position().top;

  // Thanks to MDN for the tip on collision detection!
  if (
    spriteLeft < objLeft + $(this).width() &&
    objLeft < spriteLeft + $('#sprite').width() &&
    spriteTop < objTop + $(this).height() &&
    objTop < spriteTop + $('#sprite').height()
    ) {
    console.log('contact');
    $(this).remove();
    if($(this).hasClass('friend')) {
      health+=.5;
      score+=200;
      console.log('gotcha!')
    } else {
      health-=1;
      console.log('ouch')
    }
  }
  if($(this).position().left < -100) {
    score +=25;
    $(this).remove();
  }

  if (health <= 0 ) {
    console.log('game over!');
    $('#final').html('Game over! You scored ' + score + ' points and bustled for ' + timeElapsed +' seconds!')
    $('#final').show();
    paused = true;
    clearInverval(timer);
    clearInverval(mover);
  }

}

function chairMaker() {
  var foe = $('<div>').attr('class', 'chair enemy '+ timeElapsed);
  foe.css({top: (Math.floor(Math.random()*500) + 90), left: $(window).innerWidth()-70})
  $('#container').append(foe);
  return foe;
}

function plateMaker() {
  var plate = $('<div>').attr('class', 'friend '+ timeElapsed);
  plate.css({top: (Math.floor(Math.random()*500) + 90), left: $(window).innerWidth()-70})
  $('#container').append(plate);
}

function tableMaker() {

  var whichTable = Math.random();

  if (whichTable < (1/3)) {
    makeTop(9);
  } else if (whichTable <(2/3)) {
    makeBot(9);
  } else {
    makeTop(3);
    makeBot(3);
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
      bottom: 0,
      height: ($('#container').height())/2 - (($('#container').height())/60  +  botFlex),
      })
    $('#container').append(tableBot);
    return tableBot;
  }
}

function pauser (e) {
  if (e.keyCode === 80) {
    paused = true;
    $('#pauseScreen').show();
    $('.enemy').clearQueue();
  } else if (e.keyCode === 32) {
    paused = false;
    $('#pauseScreen').hide();
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
  } else if (busTop > 100 && e.keyCode === 38) {

    //up
    sprite.animate({top: '-=15px'}, 100);
  } else if (busBottom < ($('#field').height() + 90) && e.keyCode === 40) {

    //down
    sprite.animate({top: '+=15px'}, 100);
  }
}

$(document).keyup(busControls);
$(document).keydown(pauser);
