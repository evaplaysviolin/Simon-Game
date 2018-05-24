$(document).ready(function() {
  
  var colors = ["green", "red", "yellow", "blue"];
  var simon = [], player = [];
  var total = 1;
  var startTimeout, simonTimeout, inputTimeout, correctTimeout, incorrectTimeout;
  
  $("#window span").hide();
  $(".button").css("pointer-events", "none");
  
  $(".toggle input").click(function() {
    if ($(".toggle input").prop("checked") === false) {
      $(".button").css("pointer-events", "none");
      $(".strict").removeClass("strictOn");
      $(".start").removeClass("startOn");
      clearTimeouts();
      $("#window span").hide();
    } else {
      $("#window span").text("--");
      $("#window span").fadeIn(300);
    }
  });
  
  $(".strict, .start").click(function() {
    if ($(".toggle input").prop("checked") === true) {
      if ($(this).hasClass("strict")) {
        $(".strict").toggleClass("strictOn");
      } else if ($(this).hasClass("start")) {
        $(".start").toggleClass("startOn");
      }
    }
  });
  
  $(".start").click(function() {
    if ($(".toggle input").prop("checked") === true && 
        $(".start").hasClass("startOn")) {
      generateSimon();
      startTimeout = setTimeout(function() {
        playSimon(0, total, 1000, lightSound);
      }, 1500);
      $(".button").unbind().click(function() {
        buttonActions.call($(this));
        if (check() == true) {
          correctInput();
        } else {
          incorrectInput();
        }
      });
    } else if ($(".toggle input").prop("checked") === true && 
               !$(".start").hasClass("startOn")) {
      clearTimeouts();
      $("#window span").text("--");
      $("#window span").fadeIn(300);
    }
  });
  
  function generateSimon() {
    simon = [], player = [], total = 1;
    for (i = 0; i < 20; i++) {
      var addSimon = Math.floor(Math.random() * 4);
      simon.push(colors[addSimon]);
    }
  }
  
  function playSimon(add, total, mseconds, lightSound) {
    $(".button").css("pointer-events", "none");
    if (add >= 20) {
      clearTimeout(inputTimeout);
      return;
    }
    lightSound(add);
    add++;
    $("#window span").show();
    $("#window span").text(total);
    if (add < total) {
      simonTimeout = setTimeout(function() {
        playSimon(add, total, mseconds, lightSound);
      }, mseconds);
    } else {
      $(".button").css("pointer-events", "auto");
      inputTimer();
    }
  }
  
  function lightSound(add) {
    $("." + simon[add]).toggleClass("hover");
    $("#" + simon[add] + "Sound")[0].load();
    $("#" + simon[add] + "Sound")[0].play();
    setTimeout(function() {
      $("#" + simon[add] + "Sound")[0].load();
      $("." + simon[add]).toggleClass("hover");
    }, 500);
  }
  
  function buttonActions() {
    if ($(this).hasClass("green")) {
      player.push("green");
      $("#greenSound")[0].load();
      $("#greenSound")[0].play();
    } else if ($(this).hasClass("red")) {
      player.push("red");
      $("#redSound")[0].load();
      $("#redSound")[0].play();
    } else if ($(this).hasClass("yellow")) {
      player.push("yellow");
      $("#yellowSound")[0].load();
      $("#yellowSound")[0].play();
    } else if ($(this).hasClass("blue")) {
      player.push("blue");
      $("#blueSound")[0].load();
      $("#blueSound")[0].play();
    }
  }
  
  function check() {
    if (player[player.length - 1] == simon[player.length - 1]) {
      return true;
    } else {
      return false;
    }
  }
  
  function inputTimer() {
    inputTimeout = setTimeout(function() {
      incorrectInput();
    }, 5000);
  }
  
  function correctInput() {
    clearTimeout(inputTimeout);
    if (player.length == 20) {
      $(".button").css("pointer-events", "none");
      $(".start").removeClass("startOn");
      clearTimeouts();
      fadeWindowText("•ᵕ•", 300);
      $("#window span").fadeIn(300);
    } else if (player.length == total) {
      $(".button").css("pointer-events", "none");
      player = [];
      total++;
      correctTimeout = setTimeout(function() {
        playSimon(0, total, 1000, lightSound);
      }, 1000);
    } else {
      clearTimeout(inputTimeout);
      inputTimer();
    }
  }
  
  function incorrectInput() {
    $(".button").css("pointer-events", "none");
    clearTimeouts();
    fadeWindowText("! ! !", 500);
    player = [];
    if ($(".strict").hasClass("strictOn")) {
      generateSimon();
    }
    incorrectTimeout = setTimeout(function() {
      playSimon(0, total, 1000, lightSound);
    }, 3500);
  }
  
  function fadeWindowText(text, lastFade) {
    $("#window span").hide();
    $("#window span").text(text);
    $("#window span").fadeIn(300).fadeOut(300)
      .fadeIn(300).fadeOut(300)
      .fadeIn(300).fadeOut(lastFade);
  }
  
  function clearTimeouts() {
    clearTimeout(startTimeout);
    clearTimeout(simonTimeout);
    clearTimeout(inputTimeout);
    clearTimeout(correctTimeout);
    clearTimeout(incorrectTimeout);
  }
  
});