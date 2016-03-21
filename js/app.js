$(document).ready(function() {

  var newGame = function() {
    var nextTurn = "X";
    // keep track of clicks in case of draw
    var clickCounter = 0;
    $("#message-box").text("It's " + nextTurn + "'s turn.");
    var winningLines = [[0, 1, 2],
                        [3, 4, 5],
                        [6, 7, 8],
                        [0, 3, 6],
                        [1, 4, 7],
                        [2, 5, 8],
                        [0, 4, 8],
                        [2, 4, 6]];

    var checkLine = function(x, y, z) {
      // returns true if x, y, and z are the same and not null
      return ($('#box' + x).text() === $('#box' + y).text() &&
              $('#box' + y).text() === $('#box' + z).text() &&
              $('#box' + x).text() !== "");
    };
    var somebodyWon = function() {
      // assume none of the lines are winning
      var winner = false;
      // for each array of winningLines, check to actual lines on board
      $.each(winningLines, function(i, line) {
        if (checkLine(line[0], line[1], line[2])) {
          winner = true;
          return;
        }
      });
      return winner;
    };

    $(".box").on("click", function(event) {
      $(this).text(nextTurn);
        //adds class with value of nextTurn ("x" or "o")
      clickCounter++;
      if(somebodyWon()) {
        $("#message-box").text(nextTurn + " wins!");
        $(".box").unbind("click");
      } else if (clickCounter >= 9){
        $("#message-box").text("Draw!");
      } else {
        if(nextTurn === "X") {
          nextTurn = "O";
        } else {
          nextTurn = "X";
        }
        $("#message-box").text("It's " + nextTurn + "'s turn.");
        // stop listening for clicks
        $(this).unbind(event);
      }
    });
  };
  $(".btn").on("click", function(event) {
    $(".box").text("");
    newGame();
  });
  newGame();

});
