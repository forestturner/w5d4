$(function() {
  let g = new Game();
  let board = createBoard(g);
  g.board = board;
  g.play();
});


function createBoard(g) {
  let board = [];
  for (var i = 0; i < 8; i++) {
    let row = [];
    $("#container").append($('<div class="row" id=row' + i + '></div>'));
    for (var j = 0; j < 8; j++) {
      row.push(null);
      $("#row" + i ).append(
        $('<div class="grid_square" id=row' + i + 'col' + j + '></div>').on('click', function(e) {
          g.clicked(e.target);
        })
      );
    }
    board.push(row);
  }
  board[3][3] = 0;
  board[4][4] = 0;
  board[3][4] = 1;
  board[4][3] = 1;
  return board;
}

// function



// function renderBoard(board) {
//
// }

class Game {
  constructor(players) {

    this.board = null;
    this.currentPlayer = 0;
  }

  switchPlayers() {
    this.currentPlayer = this.currentPlayer === 0 ? 1 : 0;
  }

  clicked(el) {
    let id = $(el).attr("id");
    if (typeof id === "undefined") {
      return;
    }
    let x = parseInt(id.substring(7,8));
    let y = parseInt(id.substring(3,4));
    this.board[x][y] = this.currentPlayer;
    this.switchPlayers();
    this.render();
  }
  validMove(player) {
    let listOfValidMoves = [];
    let pieces = [];
    this.foreach( (el,x,y) => {
      if (el === this.currentPlayer) {
        this.getValidMoves(x, y, this.currentPlayer);
        pieces.push( [x,y] );
      }
    });

  }

  getValidMoves(x, y, player) {
    while
  }

  tryUp(x, y, player) {
    let validMove = false
    y++
    let otherPlayer = player === 0 ? 1 : 0
    while (this.board[x][y] === otherPlayer && y >= 0) {
      validMove = true
      y++
    }
    if (validMove && this.board[x][y] === null) {
      return [x, y]
    }
  }

  foreach(func) {
    this.board.forEach((arr, y) => {
      arr.forEach((el, x) => {
        func(el,x,y);
      });
    });
  }

  render() {
    this.board.forEach((arr, y) => {
      arr.forEach((el, x) => {
        if (el === 0) {
          $("#row" + x + "col" + y).html("<div><div class='piece white'></div></div>");
        } else if (el === 1) {
          $("#row" + x + "col" + y).html("<div><div class='piece black'></div></div>");
        }
      });
    });
  }

  play() {
    this.render();
  }


}
