# tic-tac-toe
a classic game built with factory function, modules and OOP concepts










# pseudocode
HTML struct:
- main
    - header: title div
    - body: 
        - announcer div
        - grid div
        - restart div
    - footer: footer div

CSS:
- main
    - padding
    - text-align center
    - flex, column, jcc, acc

DOM declarations:
- announcement msg
- gamegrids => add event listner
=> upon click
    - change tile textContent
    - update tile state
    - prevent tile from being changed again

gameplay functions:
- gameStart()
    ==> when first tile is selected, trigger game start
- gameAnnouncer()
    ==> before game start: prompts player 1 to select a tile
    ==> game start: updates when turn changes
- turnTracker() (i.e. keeps track of turn)
- userOneMakeMove() (i.e. select a tile)
    ==> user selects a tile
    ==> if tile already selected, prevent user from selecting
    ==> if tile not selected, select tile
- userTwoMakeMove
    ==> PC selects a tile based on game board
- gameOver() 
    ==> when all tiles are filled or 3 consecutives tiles are formed
    ==> outcome (draw, PC win, user win)
- restart()
==> resets game board

event listeners:
- hover over tile
- click on tile
    => (1) click filled tile, (2) click empty tile
    => disable when game is over
- hover over restart button
- click on restart button

data struct
    - factory function (returns new object when called)
    - module (can contain private and public fx but only exposes public functions)


Rule of thumb: if you only ever need ONE of something (gameBoard, displayController), use a module. If you need multiples of something (players!), create them with factories.