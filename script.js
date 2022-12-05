//* board arrays and drawing board
const gameBoard = (() => {
    let boards = {
        playedBoard: [,],
        winningBoards: [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]
    };
    const drawGameBoard = () => {
        const board = document.querySelector('.gameboard');
        for (let i = 0; i < 9; i++) {
            const gameCell = document.createElement('div');
            gameCell.classList.add('cell');
            gameCell.setAttribute('data-id', i);
            board.appendChild(gameCell);
        }
        board.addEventListener('click', (e) => {
            gameController.gameTurn(e);
        });
    };
    drawGameBoard();
    const gameCells = document.querySelectorAll('.cell');
    return { boards, drawGameBoard, gameCells };
})();


const Player = (name, mark) => {
    const turn = id => {
        gameBoard.gameCells[id].innerText = mark;
        gameBoard.gameCells[id].classList.add('clicked');
        gameBoard.boards.playedBoard[id] = mark;
    };
    return { name, mark, turn };
};
const player1 = Player('Player 1', "X");
const player2 = Player('Player 2', "O");


//* game module
const gameController = (() => {
    let activePlayer = player1;
    const gameMode = ["vs", "ai"];
    let winnerDeclared = false;
    let remainingSpots = 9;
    const endScreen = document.querySelector('.endgame');
    const winScreen = document.querySelector('.win');
    const loseScreen = document.querySelector('.lose');
    const drawScreen = document.querySelector('.draw');
    const message = document.querySelector('#message');
    const changeActivePlayer = () => {
        activePlayer === player1 ? activePlayer = player2 : activePlayer = player1;
        message.innerText = `${activePlayer.name}, it's your turn`;
    };

    const checkWinner = (player) => {
        gameBoard.boards.winningBoards.forEach((e) => {
            if (gameBoard.boards.playedBoard[e[0]] === player.mark && gameBoard.boards.playedBoard[e[1]] === player.mark && gameBoard.boards.playedBoard[e[2]] === player.mark) {
                endScreen.classList.remove('hidden');
                winScreen.classList.remove('hidden');
                winScreen.innerText= `winner is ${player.name}`;
                winnerDeclared = true;
            }
        });
        if (remainingSpots === 0 && !winnerDeclared) {
            endScreen.classList.remove('hidden');
            drawScreen.classList.remove('hidden');
            winnerDeclared = true;
        };
    };
    const gameTurn = (event) => {
        if (event.target.classList.contains('cell') && !winnerDeclared) {
            remainingSpots--;
            let id = event.target.dataset.id;
            activePlayer.turn(id);
            checkWinner(activePlayer);
            changeActivePlayer();
        }
    };
    return { changeActivePlayer, gameTurn, endScreen, winScreen, loseScreen, drawScreen };
})();

//*settings and buttons module 
const interface = (() => {
    const mainscreen = document.querySelector('.mainscreen');
    const squares = document.querySelector('.gameboard');
    const squaresInfo = document.querySelector('.gameboard-info');
    const settingsscreen = document.querySelector('.settingsscreen');
    const btnBackToMain = document.querySelector('.backtomain');
    const playGameBtn = document.querySelector('#playgame');
    const settingsAccept = document.querySelector('.settingsaccept');
    const settingsCancel = document.querySelector('.settingscancel');
    const settingsBtn = document.querySelector('#settings');

    playGameBtn.addEventListener('click', () => {
        mainscreen.classList.toggle('hideleft');
        squares.classList.toggle('showleft');
        squaresInfo.classList.toggle('showleft');

    });
    settingsBtn.addEventListener('click', () => {
        mainscreen.classList.toggle('hideright');
        settingsscreen.classList.toggle('showright');

    });
    settingsAccept.addEventListener('click', () => {
        mainscreen.classList.remove('hideright');
        mainscreen.classList.add('showleft');
        settingsscreen.classList.remove('showright');
        settingsscreen.classList.add('hideleft');
        defaultClasses();

    });
    settingsCancel.addEventListener('click', () => {
        mainscreen.classList.remove('hideright');
        mainscreen.classList.add('showleft');
        settingsscreen.classList.remove('showright');
        settingsscreen.classList.add('hideleft');
        defaultClasses();
    });
    btnBackToMain.addEventListener('click', () => {
        mainscreen.classList.remove('hideleft');
        squares.classList.remove('showleft');
        squaresInfo.classList.remove('showleft');
        mainscreen.classList.add('showright');
        squares.classList.add('hideright');
        squaresInfo.classList.add('hideright');
        defaultClasses();
    });

    function defaultClasses() {
        gameController.endScreen.className = "endgame hidden";
        gameController.winScreen.className = "win hidden";
        gameController.loseScreen.className = "lose hidden";
        gameController.drawScreen.className = "draw hidden";
        setTimeout(() => {
            squares.className = "gameboard";
            squaresInfo.className = "gameboard-info";
            mainscreen.className = "mainscreen";
            settingsscreen.className = "settingsscreen";
        }, 720);
    }
    return {};
})();


