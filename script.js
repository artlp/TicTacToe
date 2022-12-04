const gameBoard = {
    emptyBoard: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    playedBoard: [, , , , , , , ,],
    winningBoards: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ],
};
const Player = (name, mark) => {
    const turn = id => {
        gameCells[id].innerText = mark;
        gameCells[id].classList.add('clicked');
        gameBoard.playedBoard[id] = mark;
        remainingSpots--;
    };
    return { name, mark, turn };
};
const player1 = Player('Player 1', "X");
const player2 = Player('Player 2', "O");

let activePlayer = player1;
let winnerDeclared = false;
let remainingSpots = 9;

const changeActivePlayer = () => {
    activePlayer === player1 ? activePlayer = player2 : activePlayer = player1;
};

function checkWinner(player) {
    gameBoard.winningBoards.forEach((e, i) => {
        if (gameBoard.playedBoard[e[0]] === activePlayer.mark && gameBoard.playedBoard[e[1]] === player.mark && gameBoard.playedBoard[e[2]] === player.mark) {
            console.log(`winner is ${player.name}`);
            winnerDeclared = true;
        }       
    })
    if (remainingSpots === 0 && !winnerDeclared) {
        console.log("it's a draw");
        winnerDeclared = true;
    };
}


const board = document.querySelector('.gameboard');
board.addEventListener('click', () => {
    if (event.target.classList.contains('cell') && !winnerDeclared) {
        let id = event.target.dataset.id;
        activePlayer.turn(id);
        checkWinner(activePlayer);
        changeActivePlayer();
    }
});
const drawGameBoard = (function () {
    for (let i = 0; i < gameBoard.emptyBoard.length; i++) {
        const gameCell = document.createElement('div');
        gameCell.classList.add('cell');
        gameCell.setAttribute('data-id', i);
        board.appendChild(gameCell);
    }
})();
const gameCells = document.querySelectorAll('.cell');
