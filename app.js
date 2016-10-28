console.log('app.js connected!');
var sprite = $('#sprite');
var timeElapsed = 0;
var health = 5;
var speed;
var score = 0;
//game starts at paused to prevent running during the landing page
var paused =  true;
//seizes everything after the '=' in the url
var nickname = (window.location.search).slice(10).toUpperCase();

  //prevent the lander from running the game
  if(nickname) {
    $('#pauseScreen').hide();
    $('#final').hide();
    paused = false;
    if(nickname.length > 0) {
      $('#nn').text(`${nickname}!`)
    } else {
      $('#message').html('YO NEW KID! GET TO WORK!')
    }
  }

  //controls the spawn rate of enemies and plates
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
      } else if (timeElapsed % 7 === 0) {
        plateMaker()
      }
    } else if(timeElapsed < 50) {
      console.log('level2');
      speed = 75;
      if (timeElapsed % 5 === 0) {
        tableMaker();
      } else if (timeElapsed % 2 === 0 ) {
        chairMaker();
      } else if (timeElapsed % 7 === 0) {
        plateMaker()
      }
    } else if(timeElapsed < 70) {
      console.log('level3');
      speed = 50;
      if (timeElapsed % 3 === 0) {
        tableMaker();
      } else if (timeElapsed % 1 === 0 ) {
        chairMaker();
      } else if (timeElapsed % 7 === 0) {
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
      } else if (timeElapsed % 7 === 0) {
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

  //moves divs, updates score/health, and calls the checker (below)
  var mover = setInterval(function () {
    if(!paused) {
      $('.enemy').animate({left: '-=10'}, speed, 'linear', checker)
      $('.friend').animate({left: '-=10'}, speed, 'linear', checker)
      $('#score1').html('score: ' + Math.floor(score));
      $('#lives').text(health);
      $('#time1').html('time: ' + timeElapsed);
      score += .25;
    } else {
      clearInverval(mover);
    }
  }, 10)

//checks for collision and collision type. updates score and health accordingly.
function checker() {

  var spriteLeft = $('#sprite').position().left;
  var spriteTop = $('#sprite').position().top;
  var objLeft = $(this).position().left;
  var objTop = $(this).position().top;

  // Thanks to MDN for the tip on collision detection!
  // My version of this algorithm only works if everything is the same size.
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

  //remove divs after they leave the screen
  if($(this).position().left < -100) {
    score +=25;
    $(this).remove();
  }

  //check player health
  if (health <= 0 ) {
    $(document).off('keyup');
    console.log('game over!');
    $('.final').html('Game over! You scored ' + score + ' points and bustled for ' + timeElapsed +' seconds!')

    $('.final').css({
      top: ($('#container').height()/3),
      width: ($('#container').width()/2),
      padding: 10,
    });
    $('.refresh').html('Refresh the page to try again!');
    $('.refresh').css({
      top: ($('#container').height()/3) + $('.final').height() + 10,
    })
    paused = true;
    clearInverval(timer);
    clearInverval(mover);
  }

}

//makes chairs
function chairMaker() {
  var foe = $('<div>').attr('class', 'chair enemy '+ timeElapsed);
  foe.css({top: (Math.floor(Math.random()*500) + 90), left: $(window).innerWidth()-70})
  $('#container').append(foe);
}

//makes plates
function plateMaker() {
  var plate = $('<div>').attr('class', 'friend '+ timeElapsed);
  plate.css({top: (Math.floor(Math.random()*500) + 90), left: $(window).innerWidth()-70})
  $('#container').append(plate);
}

//makes tables
function tableMaker() {

  //evenly distrubtes instances table spawns at the top/bottom/both of the screen
  var whichTable = Math.random();

  if (whichTable < (1/3)) {
    makeTop(9);
  } else if (whichTable <(2/3)) {
    makeBot(9);
  } else {
    makeTop(3);
    makeBot(3);
  }

  //takes an argument which changes the height of the table
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

//pauses the game
function pauser (e) {
  if (e.keyCode === 80) {
    paused = true;
    $('#pauseScreen').show();
    $('.enemy').clearQueue();
    $('.friend').clearQueue();
    $(document).off('keyup');
  } else if (e.keyCode === 32) {
    paused = false;
    $('#pauseScreen').hide();
    $(document).keyup(busControls);
  }
}

//controls the sprite
function busControls (e) {

  var busLeft = sprite.position().left;
  var busRight = sprite.position().left + sprite.width();
  var busTop = sprite.position().top;
  var busBottom = sprite.position().top + sprite.height();

  if (busRight < ($('#field').width()) && e.keyCode === 39) {

    //right
    sprite.animate({left: '+=25px'}, 100);
  } else if (busLeft > 8 && e.keyCode === 37) {

    //left
    sprite.animate({left: '-=25px'}, 100);
  } else if (busTop > 100 && e.keyCode === 38) {

    //up
    sprite.animate({top: '-=25px'}, 100);
  } else if (busBottom < ($('#field').height() + 90) && e.keyCode === 40) {

    //down
    sprite.animate({top: '+=25px'}, 100);
  }
}

//event listners for the sprite and pause/resume buttons
$(document).keyup(busControls);
$(document).keydown(pauser);
