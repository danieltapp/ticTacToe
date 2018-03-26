$(document).ready(function() {
  $(".modal").modal();
});

//buttons
$("#setX").click(function() {
  playerSymbol = "x";
  computersSymbol = "o";
});
$("#setO").click(function() {
  playerSymbol = "o";
  computersSymbol = "x";
});

//winning combinations
var winningCombos = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 5, 9],
  [2, 5, 8],
  [3, 5, 7],
  [1, 4, 7]
];
let playerCombos = [];
let computerCombos = [];
var availableNums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
//computers turn?
var computersTurn = false;
//set x or y
var playerSymbol = "x";
var computersSymbol = "0";

$(".box").click(function() {
  playerCombos.push(parseInt(`${this.id}`));
  $(`#${this.id}`).replaceWith(`<p class="box">${playerSymbol}</p>`);
  setTimeout(computerPlay, 500);
});

//check to see if user/computer has made enough selections to test if winning combination has been made

function testy() {
 for(var i=0; i<winningCombos.length; i++) {
   // It's only 3 elements do you really need to loop?
   if (playerCombos.indexOf(winningCombos[i][0]) > -1
        && playerCombos.indexOf(winningCombos[i][1]) > -1
        && playerCombos.indexOf(winningCombos[i][2]) > -1) {
       alert('you won!');
       history.go(0);
       break;
   } else if (computerCombos.indexOf(winningCombos[i][0]) > -1
        && computerCombos.indexOf(winningCombos[i][1]) > -1
        && computerCombos.indexOf(winningCombos[i][2]) > -1) {
       // o won!
       alert('You LOSE!!!');
       history.go();
       break;
   } else if (playerCombos.length == 5 
             && computerCombos.length == 4) {
             alert('better luck next time...');
             history.go();
             break;
   }
}
}


//if player hasn't hit winning combination, then the computer makes it's move and test itself for a win

function computerPlay() {
  testy();
  availableNums = availableNums.filter(function(val) {
    return playerCombos.indexOf(val) == -1;
  });
  var randomNumber =
    availableNums[Math.floor(Math.random() * availableNums.length)];
  computerCombos.push(parseInt(`${randomNumber}`));
  $(`#${randomNumber}`).replaceWith(`<p class="box">${computersSymbol}</p>`);
  availableNums = availableNums.filter(function(val) {
    return computerCombos.indexOf(val) == -1;
  });
  testy();
}