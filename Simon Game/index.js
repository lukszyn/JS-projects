$(document).ready(function(){

  var gamePattern = [];
  var buttonColors = ["red", "blue", "yellow", "green"];
  var userPattern = [];
  var level = 0;
  var started = false;

  $(document).keydown(function(){
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });

  $(".btn").click(function(){
    var buttonUsed = $(this).attr("id");
    userPattern.push(buttonUsed);

    playSound(buttonUsed);
    animatePress(buttonUsed);

    checkAnswer(userPattern.length - 1);
  });

  function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }

  function animatePress(color) {
    $("#" + color).addClass("pressed");
    setTimeout(function(){
      $("#" + color).removeClass("pressed");}, 100);
  }

  function nextSequence() {
    level++;
    userPattern = [];
    $("h1").text("Level " +  level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomColor = buttonColors[randomNumber];
    gamePattern.push(randomColor);

    $("#" + randomColor).fadeIn(200).fadeOut(200).fadeIn(200);
    playSound(randomColor);
  }

  function checkAnswer(currentLevel) {

    if (userPattern[currentLevel] === gamePattern[currentLevel]) {
      if (userPattern.length === gamePattern.length){
        setTimeout(function() {
          nextSequence();
         }, 1000);
      }
    }

    else {
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");}, 200);
      $("h1").text("Game over, press any key to restart");
      startOver();
    }

  }

  function startOver() {
    started = false;
    level = 0;
    gamePattern = [];
  }
});
