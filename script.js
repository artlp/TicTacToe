const gameBoard = {
    emptyBoard: [1, 2, 3, 4, 5, 6, 7, 8],
    playedBoard: [, , , , , , , ,],
};
const Player = (name, mark) => {
    const getName = () => name;
    const getMark = () => mark;
    const turn = id => {
        gameCells[id].innerText = mark;
        gameBoard.playedBoard[id] = mark;
    };
return {getName, getMark, turn};
};
const player1 = Player('Player 1', "X");
const player2 = Player('Player 2', "O");
let activePlayer = player1;
const changeActivePlayer = () => {
    activePlayer === player1 ? activePlayer = player2 : activePlayer = player1;
}



const board = document.querySelector('.gameboard');
board.addEventListener('click', () => {
    if (event.target.classList.contains('cell')) {
        let id = event.target.dataset.id;
        activePlayer.turn(id);
        changeActivePlayer();
    }
});
const drawGameBoard = (function () {
    for (let i = 0; i <= gameBoard.emptyBoard.length; i++) {
        const gameCell = document.createElement('div');
        gameCell.classList.add('cell');
        gameCell.setAttribute('data-id', i);
        board.appendChild(gameCell);
    }
})();
const gameCells = document.querySelectorAll('.cell');

const addMark = (id, player) => {
    gameCells[id].innerText = gameBoard.player2.mark;
    console.log(id, event);
};