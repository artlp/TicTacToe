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
    const changeActivePlayer = () => {
        activePlayer === player1 ? activePlayer = player2 : activePlayer = player1;
    };

    const checkWinner = (player) => {
        gameBoard.boards.winningBoards.forEach((e) => {
            if (gameBoard.boards.playedBoard[e[0]] === player.mark && gameBoard.boards.playedBoard[e[1]] === player.mark && gameBoard.boards.playedBoard[e[2]] === player.mark) {
                console.log(`winner is ${player.name}`);
                winnerDeclared = true;
            }
        });
        if (remainingSpots === 0 && !winnerDeclared) {
            console.log("it's a draw");
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
    return { changeActivePlayer, gameTurn };
})();

//*settings and buttons module 
const interface = (() => {
    const mainscreen = document.querySelector('.mainscreen');
    const squares = document.querySelector('.gameboard');
    const squaresInfo = document.querySelector('.gameboard-info');
    const settingsscreen = document.querySelector('.settingsscreen');
    const playGameBtn = document.querySelector('#playgame');
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
    return {}
})();


