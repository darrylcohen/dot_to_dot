// This is the code for the game Dot to Dot.
// It has been written using Objects.  The objects are
// . Viewer : Deals with input and output to the screen
// . Manager : Controls the flow between the Viewer and the logic Objects
// . Grid : Deals with the logic of the player
// . Player : The players in the game

//Default the number of players
const PLAYER_DEFAULT = 2;
const POINT = 'P';
const HOUSE = 'H';
const SURROUNDED_HOUSE = 'S';
const WALL_HORIONTAL = 'WH';
const WALL_VERTICAL = 'WV'
const CLICKED_WALL = 'C';
const VERTICAL = 'V';
const HORIZONTAL = 'H';

// Viewer object to deal with input and output to the screen
var viewer = function() {
  var myGrid = document.querySelector('#grid')
  var playBTN = document.querySelector('#playGame')
  var numberPlayers = document.querySelector('#numPlayers');
  var gridSize = document.querySelector('#gridSize');
  var players = document.querySelector('#players');
  var currentPlayer;
  var playerNum;
  var colour;
  var interval;

  var viewerI = {

  // Initialise : creat event listeners when the viewer object is created
    initialise : function(myManager) {

      // Listen for eent clicks on the grid. Ask the manager if its a valid click
      // then chnage the display of the position clicked
      myGrid.addEventListener('click', function(event){
        var pos = Number(event.target.getAttribute('data-pos'));
        var row = Number(event.target.getAttribute('data-row'));
        var col = Number(event.target.getAttribute('data-col'));

        // If its a valid click then need to check if the houses around the wall clicked
        // are surrounded by clicks
        if(myManager.isLegalMove(row, col)) {
          event.target.classList.add('clicked')

          var houses = myManager.isHouseSurrounded(pos, row, col) // houses an array
          if (houses.length === 0 ){
            myManager.changePlayer();
          } else {
            for (var i = 0; i < houses.length; i++) {
              var block = document.getElementById(houses[i]);
              block.classList.remove('house')
              block.classList.add('clicked')
              // block.textContent = playerNum;
              block.style.backgroundColor = colour;
              block.textContent = playerNum
              myManager.updateScore();
            }
          }
        }
      });

      //Event lisener to play the game. Tells the manager to play the game
      playBTN.addEventListener('click',function(){
        myManager.playGame(Number(numberPlayers.value), gridSize.value)
      });
    },

    // Creates the number of players in the game and assigns id's for later use
    drawPlayers : function(players) {
      var playersDiv = document.querySelector('#players')
      viewerI.clearPlayers(playersDiv);

      for (var i = 0; i < players.length; i++) {
        var playerDiv = document.createElement('div');
        var playerName = document.createElement('h3');
        var playerScore = document.createElement('p');
        playerName.textContent = 'Player ' + players[i].getPlayerNumber();
        playerScore.textContent = players[i].getScore();
        playerScore.classList.add('playerScore');
        playerScore.id = 's' + (i+1);
        playerDiv.id = 'p' + (i+1);
        playerDiv.appendChild(playerName);
        playerDiv.style.backgroundColor = players[i].getColour();
        playerDiv.classList.add('player');
        playerDiv.appendChild(playerScore);
        playersDiv.appendChild(playerDiv);
      }
      currentPlayer = document.querySelector('#p1');
      // currentPlayer.classList.toggle('playerBorder');

      // currentPlayer.style.outlineColor = players[0].getColour();
    },

    // Changes the players turn
    changePlayer : function(player) {
      console.log('player num ' + player.getPlayerNumber());
      clearInterval(interval);
      currentPlayer.classList.remove('playerBorder')
      currentPlayer = document.querySelector('#p' + player.getPlayerNumber())
      playerNum = player.getPlayerNumber();
      interval = setInterval(function() {
        currentPlayer.classList.toggle ('playerBorder')
      },500)
      // currentPlayer.style.outlineColor = colour;
    },

    //Clears the current players for a new game
    clearPlayers : function(playersDiv) {
      while (playersDiv.firstChild) {
        playersDiv.removeChild(playersDiv.firstChild);
      }
    },

    //Updates the score when a house is surrounded by clicked walls
    updateScore : function (player) {
      document.querySelector('#s' + player.getPlayerNumber()).textContent = player.getScore();
    },

    showWinner : function (message) {
      clearInterval(interval);
      currentPlayer.classList.remove('playerBorder')
      viewerI.clearGrid();
      var winnerDiv = document.createElement("div");
      var winnerMessage = document.createElement("h2");
      winnerMessage.textContent = message;
      winnerMessage.classList.add("winner");
      myGrid.appendChild(winnerMessage);
      setTimeout(function(){
        myManager.playGame(Number(numberPlayers.value), gridSize.value)
      },10000)

    },

    //Draws the grid for the game
    drawGrid : function(aGrid, numberPlayers) {
      viewerI.clearGrid();

      var count = 0;
      for (var i = 0; i < aGrid.length; i++) {
        var row = document.createElement('div');
        row.className = "row"
        for (var j = 0; j < aGrid[i].length; j++) {
          var blockContainer = document.createElement('div');
          var block = document.createElement('div');
          block.setAttribute('data-row', i);
          block.setAttribute('data-col', j);
          block.setAttribute('data-pos', count);
          block.id = count;

          if (aGrid[i][j] === POINT) {
            block.className = "block point";
          } else if (aGrid[i][j] === HOUSE) {
            block.className = "block house"
          } else if (aGrid[i][j] === WALL_HORIONTAL){
            block.className = "block wall_horizontal"
          } else {
            block.className = "block wall_vertical"
          }
          row.appendChild(block)
          count++;
        }
        myGrid.style.border = "20px solid blue";
        myGrid.appendChild(row)
      }
    },

    //Clears the grid for a new game
    clearGrid : function() {
      while (myGrid.firstChild) {
        myGrid.removeChild(myGrid.firstChild);
      }
    },
  }

  // returns the viewer object
  return viewerI
}

// Playeer object which has a score, number and colour
var player = function() {
  var score = 0;
  var playerNumber;
  var myColour;

  var playerI = {
    initialise : function(playerNum, colour) {
      playerNumber = playerNum;
      myColour = colour
      return playerI;
    },

    incrementScore : function() {
      return score += 1;
    },

    getScore : function() {
      return score;
    },

    getColour : function () {
      return myColour;
    },

    resetScore : function() {
      score = 0;
    },

    getPlayerNumber : function () {
      return playerNumber;
    }
  }

  // return the player object
  return playerI
}

// Grid has logic to see what has been clicked
var grid = function() {
  const POINT = 'P';
  const HOUSE = 'H';
  const SURROUNDED_HOUSE = 'S';
  const WALL_HORIONTAL = 'WH';
  const WALL_VERTICAL = 'WV'
  const CLICKED_WALL = 'C';
  const VERTICAL = 'V';
  const HORIZONTAL = 'H';
  var myGrid = []
  var gridI = {

    //Initialise creates a grid based on Grid Size
    initialise : function (aGridSize) {
      myGrid = []

      gridSize = aGridSize * 2 + 1;
      for (var i = 0; i < gridSize ; i++) {
        var row = []
        for (var j = 0; j < gridSize; j++) {
          if (j % 2 === 0 && i % 2 === 0 ) {
            row[j] = POINT
          } else if (i % 2 === 1 && j % 2 === 1) {
            row[j] = HOUSE
          } else if (i % 2 === 1 && j % 2 === 0) {
            row[j] = WALL_VERTICAL
          } else {
            row[j] = WALL_HORIONTAL
          }
        }
        myGrid.push(row);
        row = [];
      }
    },

    getGridSize : function() {
      return myGrid[0].length;
    },

    getGrid : function() {
      return myGrid
    },

    // Checks to see if a wall has been clicked thast hasn't been clicked before
    isLegalMove : function(row, col) {
      result = false;
      if (myGrid[row][col] === WALL_HORIONTAL || myGrid[row][col] === WALL_VERTICAL) {
        myGrid[row][col] = CLICKED_WALL;
        result = true;
      }
      return result;
    },

    //Check to see if house is surrounded by walls that have been clicked
    isHosueSurrounded : function(pos, row, col, gridSize) {
      var result = [];

      if (pos % 2 === 1 && row % 2 === 0) {
        if (row !== 0 && gridI.areAllSidesClicked(pos - gridSize, gridSize)  )  {
          var posArr = gridI.getCoords(pos - gridSize);
          myGrid[posArr[0]][posArr[1]] = SURROUNDED_HOUSE;
          result.push(pos - gridSize);
        }
        if ( row !== gridSize - 1 && gridI.areAllSidesClicked(pos + gridSize, gridSize) )  {
          var posArr = gridI.getCoords(pos + gridSize);
          myGrid[posArr[0]][posArr[1]] = SURROUNDED_HOUSE;
          result.push(pos + gridSize);
        }
      } else {
        if ( col !== 0 && gridI.areAllSidesClicked(pos - 1, gridSize) )  {
          var posArr = gridI.getCoords(pos - 1);
          myGrid[posArr[0]][posArr[1]] = SURROUNDED_HOUSE;
          result.push(pos - 1);
          }
        if ( col !== gridSize - 1 && gridI.areAllSidesClicked(pos + 1, gridSize) )  {
          var posArr = gridI.getCoords(pos + 1);
          myGrid[posArr[0]][posArr[1]] = SURROUNDED_HOUSE;
          result.push(pos + 1);
          }

      }
      return result
    },

    //Turns a position into grid cordinates
    getCoords : function(pos) {
      return [Math.floor(pos / gridSize), pos % gridSize]
    },

    //Checks if all walls clicked
    areWallsAllClicked : function(leftArr, rightArr, topArr, bottomArr) {
      result = false;

      if (myGrid[leftArr[0]][leftArr[1]] === CLICKED_WALL &&
          myGrid[rightArr[0]][rightArr[1]] === CLICKED_WALL &&
          myGrid[topArr[0]][topArr[1]]=== CLICKED_WALL &&
          myGrid[bottomArr[0]][bottomArr[1]]=== CLICKED_WALL ){
            result = true;
      }
      return result;
    },

    areAllSidesClicked : function (house, gridSize) {
      result = false

      var left = house - 1;
      var right = house + 1;
      var top = house - gridSize;
      var bottom = house + gridSize;

      var leftArr = gridI.getCoords(left);
      var rightArr = gridI.getCoords(right);
      var topArr =  gridI.getCoords(top);
      var bottomArr =  gridI.getCoords(bottom);
      var posCoords = gridI.getCoords(house);

      if (house < 0 || house > gridSize * gridSize - 1 ||
        myGrid[posCoords[0]][posCoords[1]] === SURROUNDED_HOUSE) {
        result = false
      } else if (gridI.areWallsAllClicked(leftArr, rightArr, topArr, bottomArr)){
        result = true;
      }
      return result;
    },
  }
  return gridI
}

// Directs the traffic
var manager = function() {
  var myGrid = grid();
  var myViewer = viewer();
  var players = [];
  var currentPlayer = player();
  var playerNum = 1;
  var totalPlayers;
  var totalHouses = 0;
  var totalClickedHouses = 0;
  // var colours = ['PaleVioletRed ','orange','SandyBrown ','PaleGreen  ','Plum']
  var colours = ['red','red','red','red','red','red','red','red','red','red','red','red','red','red','red','red','red','red','red','red','red','red','red','red','red']
  var managerI = {
    initialise : function() {
      myViewer.initialise(managerI);
      // managerI.createPlayers(PLAYER_DEFAULT);
      // managerI.setCurrentPlayer(playerNum);
      // myViewer.drawPlayers(players);
    },

    //Starts the game
    playGame : function(numberPlayers, gridSize) {
      totalHouses = gridSize * gridSize;
      totalClickedHouses = 0;
      players = [];
      currentPlayer = player();
      myGrid.initialise(gridSize);
      managerI.createPlayers(numberPlayers);
      totalPlayers = numberPlayers;
      playerNum = 1;
      myViewer.drawPlayers(players);
      myViewer.changePlayer(players[0]);
      myViewer.drawGrid(myGrid.getGrid(), numberPlayers);
    },

    //Creates the players objects
    createPlayers : function (numberPlayers) {
      players = [];
      for (var i = 1; i <= numberPlayers; i++) {
        var myPlayer = player().initialise(i,colours[i-1]);
        players.push(myPlayer);
      }

    },

    //Asks the grid if the click is legal
    isLegalMove : function(row, col) {
      return myGrid.isLegalMove(row , col)
    },

    //Asks the grid if the house is surrounded by walls that have been clicked
    isHouseSurrounded : function (pos,row,col) {
      return myGrid.isHosueSurrounded(pos, row, col, myGrid.getGridSize())
    },

    //Change the player
    setCurrentPlayer : function(playerNum) {
      players.forEach(function(player){
        if (player.getPlayerNumber() === playerNum ) {
          currentPlayer = player;
        }
      })
    },

    // Tells the viewer to update the score
    updateScore : function () {
      currentPlayer.incrementScore();
      myViewer.updateScore(currentPlayer)
      totalClickedHouses++;
      if (totalClickedHouses === totalHouses) {
        myViewer.showWinner(managerI.getWinningPlayer());
      }
    },

    getWinningPlayer : function () {
      var highScore = 0;
      var result = [];
      // Find the highest score
      players.forEach(function(player){
        if (player.getScore() > highScore) {
          highScore = player.getScore();
        }
      });
      //See how many players got the highest score
      players.forEach(function(player){
        if (player.getScore() === highScore) {
          result.push(player);
        }
      });
      if (result.length > 1) {
        return "Game was Tied !!!!!"
      } else {
        return "Player " + result[0].getPlayerNumber() + " : Winner !!!!"
      }
    },

    //Set the current player
    changePlayer : function () {
      if (playerNum === totalPlayers) {
        playerNum = 1;
      } else {
        playerNum++;
      }
      managerI.setCurrentPlayer(playerNum)
      myViewer.changePlayer(currentPlayer);
    }

  }
  return managerI
}

//Start playing the game
var myManager = manager();
myManager.initialise();
