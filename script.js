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
    
    const winGameCheck = () => {
        let length = selectedTile.length
        if (length < 3) return;
        let differenceArr = []; // arr stores difference between numbers in sorted array
        
        for(i=1; i < length; i++){
           for(j=1;j<length;j++){
            let difference = selectedTile[length-i] - selectedTile[length-j-1]
            if (selectedTile[length-i] == selectedTile[length-j-1]) continue;
            differenceArr.push(difference)
           }
        }
        // checks if difference arr has duplicates
        let sortedDiffArr = differenceArr.sort();
        let diffLength = sortedDiffArr.length

        for (i=0;i< diffLength;i++){
            if(sortedDiffArr[i] == sortedDiffArr[i+1]){
                console.log("game won");
            }
        }
        console.log("diff arr: " + differenceArr);

    }

    // const checkIfPlayerWon = () => {

    // }

    return {playerId,playerSymbol,updatePlayerSelection, winGameCheck}
}

// player declaration
const playerOne = Player(1)
const playerTwo = Player(2)
let currentPlayer = playerOne;
let isPlayerOneTurn = true;

const GameBoard = () => {
    const announcementMessage = (playerId) =>{
        if (playerId%2==0){
            gameMessage.textContent = "O's turn";
        }
        else{
            gameMessage.textContent = "X's turn";
        }
    }
    const turnChange = () => {
        isPlayerOneTurn = !isPlayerOneTurn
        if (isPlayerOneTurn) currentPlayer = playerOne
        else currentPlayer = playerTwo
    }

    const isTileSelected = (tile) => {
        if(tile.textContent = ""){
            return false;
        } 
        return true;
    }

    const resetBoard = () => {
        gameGrids.forEach(
            (gameGrid) => {
                gameGrid.textContent = "";
            }
        )
    }
    return {announcementMessage,isTileSelected,resetBoard, turnChange}
}

// game board
const board = GameBoard();

// game start
// board.gameStart();

// add event listener to individual grid
gameGrids.forEach(
    (gameGrid) => {
        gameGrid.addEventListener("click", (event) =>{
            let selectedTile = event.target;
            let selectedTileValue = event.target.dataset.value;
            if(selectedTile.textContent == ""){
                if(isPlayerOneTurn) {selectedTile.textContent = "O";}
                else selectedTile.textContent = "X";
                board.announcementMessage(currentPlayer.playerId)
                currentPlayer.updatePlayerSelection(selectedTileValue);
                currentPlayer.winGameCheck();
                board.turnChange()
            }
            else {
                // console.log("tile is already chosen")
            }


        })
    }
)

// reset button
const resetBtn = document.getElementById("restart")

// add event listener to reset button
resetBtn.addEventListener("click", board.resetBoard)

// function tileSelected(){  
// }



// add event listener for reset button