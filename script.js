// game announcement
const gameMessage = document.getElementById("game-message")

// game grid
const gameGrids = document.querySelectorAll(".game-grid")
const tileOne = document.querySelector('[data-value="1"]');
const tileTwo = document.querySelector('[data-value="2"]');
const tileThree = document.querySelector('[data-value="3"]');
const tileFour = document.querySelector('[data-value="4"]');
const tileFive = document.querySelector('[data-value="5"]');
const tileSix = document.querySelector('[data-value="6"]');
const tileSeven = document.querySelector('[data-value="7"]');
const tileEight = document.querySelector('[data-value="8"]');
const tileNine = document.querySelector('[data-value="9"]');

const Player = (playerId) => {
    this.playerId = playerId;
    const playerSymbol = (playerId%2 == 0)? "X" : "O"
    let selectedTile = [];

    // player selects a tile and makes a choice
    const updatePlayerSelection = (tile) => {
        selectedTile.push(tile);
        selectedTile.sort();
        console.log("Player " + playerId + " chose: " + selectedTile)
    }
    return {playerId,playerSymbol,updatePlayerSelection}
}

// player declaration
const playerOne = Player(1)
const playerTwo = Player(2)
let currentPlayer = playerOne;
let isPlayerOneTurn = true;


const GameBoard = () => {
    let gameOver = false
    const announcementMessage = (playerId) =>{
        if (playerId%2==0){
            gameMessage.textContent = "O's turn";
        }
        else{
            gameMessage.textContent = "X's turn";
        }
    }
    let boardState = {
        "1": null,
        "2": null,
        "3": null,
        "4": null,
        "5": null,
        "6": null,
        "7": null,
        "8": null,
        "9": null
    }

    const setBoardState = (tileNum, player) =>{
        boardState[tileNum] = player;
        console.log(boardState);
    }

    const checkWin = (currentPlayer) => {
        // console.log(currentPlayer)
        // console.log(board.boardState)
        
        // check vertical
        for(i=1;i<=3;i++){
            if(board.boardState[i] == currentPlayer.playerSymbol &&
                board.boardState[i+3] == currentPlayer.playerSymbol &&
                board.boardState[i+6] == currentPlayer.playerSymbol
            ) return gameEnd();
        }

        // check horizontal
        for(i=1;i<=9;i+=3){
            if(board.boardState[i] == currentPlayer.playerSymbol &&
                board.boardState[i+1] == currentPlayer.playerSymbol &&
                board.boardState[i+2] == currentPlayer.playerSymbol
            ) return gameEnd();
        }

        // check diagonal
        if (board.boardState[1] == currentPlayer.playerSymbol &&
            board.boardState[5] == currentPlayer.playerSymbol &&
            board.boardState[9] == currentPlayer.playerSymbol 
            ||
            board.boardState[3] == currentPlayer.playerSymbol &&
            board.boardState[5] == currentPlayer.playerSymbol &&
            board.boardState[7] == currentPlayer.playerSymbol
            ) return gameEnd();
    
        let filled = 0;
        for(i=1;i<=9;i++){
            if(board.boardState[i] != null){
                filled+=1;
                if(filled == 9) return gameEnd("draw")
            }
        }
    }

    const turnChange = () => {
        isPlayerOneTurn = !isPlayerOneTurn
        if (isPlayerOneTurn) currentPlayer = playerOne
        else currentPlayer = playerTwo
    }

    const resetBoard = () => {
        gameGrids.forEach(
            (gameGrid) => {
                gameGrid.textContent = "";
            }
        )
        gameMessage.textContent = "O starts first";
        gameMessage.style.color = "black";
        isPlayerOneTurn = true;
        currentPlayer = playerOne;
        board.gameOver = false;
        for(i=1;i<=9;i++){
            board.boardState[i] = null;
        }
    }

    const isGameOver = () => {
        return board.gameOver;
    }
    const gameEnd = (outcome) => {
        if (outcome == "draw") gameMessage.textContent = `Its a draw!`
        else gameMessage.textContent = `${currentPlayer.playerSymbol} won!`;
        gameMessage.style.color = "green"
        board.gameOver = true;
    }

    return {announcementMessage,boardState,checkWin,isGameOver,gameEnd,resetBoard, setBoardState, turnChange}
}

// game board
const board = GameBoard();

// game start
// board.gameStart();

// add event listener to individual grid
gameGrids.forEach(
    (gameGrid) => {
        gameGrid.addEventListener("click", (event) =>{
            if (!board.isGameOver()){
                let selectedTile = event.target;
                let selectedTileValue = event.target.dataset.value;
                if(selectedTile.textContent == ""){
                    if(isPlayerOneTurn) {selectedTile.textContent = "O";}
                    else selectedTile.textContent = "X";
                    board.announcementMessage(currentPlayer.playerId)
                    // currentPlayer.updatePlayerSelection(selectedTileValue);
                    board.setBoardState(selectedTileValue,currentPlayer.playerSymbol);
                    board.checkWin(currentPlayer);
                    board.turnChange()
                }
                else {
                    // console.log("tile is already chosen")
                }
            }
        })
    }
)

function hello(event){
    
}

// reset button
const resetBtn = document.getElementById("restart")

// add event listener to reset button
resetBtn.addEventListener("click", board.resetBoard)