//* board arrays and drawing board
const gameBoard = (() => {
    let boards = {
        playedBoard: new Array(9),
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
    const colors = {
        purple: "#A172E8",
        blue: "#76D4E8",
        yellow: "#F2F088",
        green: "#63F273",
        orange: "#F2795E",
    };

    const markers = {
        cross: "⤫",
        circle: "●",
        star: "✸",
        heart: "♡",
        note: "△",
    };

    const markersArray = Object.values(markers);
    const colorsArray = Object.values(colors);
    const board = document.querySelector('.gameboard');
    let gameCells;

    const func = function (e) {
        gameController.gameTurn(e);
    };

    const drawGameBoard = () => {
        board.addEventListener('click', func);
        gameCells = document.querySelectorAll('.cell');
    };
    drawGameBoard();

    const resetGameCells = () => {
        gameCells.forEach(gameCell => {
            gameCell.innerHTML = '';
            gameCell.className = 'cell';
            gameCell.removeAttribute('style');
        });
    };

    return { boards, drawGameBoard, gameCells, colors, markers, markersArray, colorsArray, resetGameCells, board };
})();

//* players module
const Players = (() => {
    const pSBC = (p, c0, c1, l) => {
        let r, g, b, P, f, t, h, i = parseInt, m = Math.round, a = typeof (c1) == "string";
        if (typeof (p) !== "number" || p < -1 || p > 1 || typeof (c0) !== "string" || (c0[0] !== 'r' && c0[0] !== '#') || (c1 && !a)) return null;
        if (!this.pSBCr) this.pSBCr = (d) => {
            let n = d.length, x = {};
            if (n > 9) {
                [r, g, b, a] = d = d.split(","), n = d.length;
                if (n < 3 || n > 4) return null;
                x.r = i(r[3] === "a" ? r.slice(5) : r.slice(4)), x.g = i(g), x.b = i(b), x.a = a ? parseFloat(a) : -1;
            } else {
                if (n === 8 || n === 6 || n < 4) return null;
                if (n < 6) d = "#" + d[1] + d[1] + d[2] + d[2] + d[3] + d[3] + (n > 4 ? d[4] + d[4] : "");
                d = i(d.slice(1), 16);
                if (n === 9 || n === 5) x.r = d >> 24 & 255, x.g = d >> 16 & 255, x.b = d >> 8 & 255, x.a = m((d & 255) / 0.255) / 1000;
                else x.r = d >> 16, x.g = d >> 8 & 255, x.b = d & 255, x.a = -1;
            } return x;
        };
        h = c0.length > 9, h = a ? c1.length > 9 ? true : c1 == "c" ? !h : false : h, f = this.pSBCr(c0), P = p < 0, t = c1 && c1 != "c" ? this.pSBCr(c1) : P ? { r: 0, g: 0, b: 0, a: -1 } : { r: 255, g: 255, b: 255, a: -1 }, p = P ? p * -1 : p, P = 1 - p;
        if (!f || !t) return null;
        if (l) r = m(P * f.r + p * t.r), g = m(P * f.g + p * t.g), b = m(P * f.b + p * t.b);
        else r = m((P * f.r ** 2 + p * t.r ** 2) ** 0.5), g = m((P * f.g ** 2 + p * t.g ** 2) ** 0.5), b = m((P * f.b ** 2 + p * t.b ** 2) ** 0.5);
        a = f.a, t = t.a, f = a >= 0 || t >= 0, a = f ? a < 0 ? t : t < 0 ? a : a * P + t * p : 0;
        if (h) return "rgb" + (f ? "a(" : "(") + r + "," + g + "," + b + (f ? "," + m(a * 1000) / 1000 : "") + ")";
        else return "#" + (4294967296 + r * 16777216 + g * 65536 + b * 256 + (f ? m(a * 255) : 0)).toString(16).slice(1, f ? undefined : -2);
    };
    // * changing player attributes doesn't work when players are created this way
    // const Player = (name, marker, color) => {
    //     const turn = id => {
    //         gameBoard.gameCells[id].innerText = marker;
    //         gameBoard.boards.playedBoard[id] = marker;
    //         gameBoard.gameCells[id].classList.add('clicked');
    //         gameBoard.gameCells[id].style.color = color;
    //     };
    //     this.marker = marker;
    //     this.color = color;
    //     return { name, marker, color, turn };
    // };
    // const player1 = Player('Player 1', gameBoard.markersArray[0], gameBoard.colorsArray[0]);
    // const player2 = Player('Player 2', gameBoard.markersArray[1], gameBoard.colorsArray[1]);

    class Player {
        constructor(name, marker, color, score) {
            this.name = name;
            this.marker = marker;
            this.color = color;
            this.score = score;
        }
        turn(id) {
            gameBoard.gameCells[id].classList.add('flip-vertical-right');
            gameBoard.boards.playedBoard[id] = this.marker;
            setTimeout(() => {
                gameBoard.gameCells[id].innerHTML = `<span class="marker">${this.marker}</span>`;
                gameBoard.gameCells[id].classList.add('clicked');
                gameBoard.gameCells[id].style.color = pSBC(-0.55, this.color);
                gameBoard.gameCells[id].style.backgroundColor = this.color;
            }, 200);
        };

        turnCPU() {

            let validMoves = [];
            for (let i = 0; i < 9; i++) {
                if (gameBoard.boards.playedBoard[i] === undefined) {
                    validMoves.push(i);
                }
            }
            let cpuCell = validMoves[Math.floor(Math.random() * validMoves.length)];
            gameBoard.gameCells[cpuCell].classList.add('flip-vertical-right');
            gameBoard.boards.playedBoard[cpuCell] = this.marker;
            setTimeout(() => {
                gameBoard.gameCells[cpuCell].innerHTML = `<span class="marker">${this.marker}</span>`;
                gameBoard.gameCells[cpuCell].classList.add('clicked');
                gameBoard.gameCells[cpuCell].style.color = pSBC(-0.55, this.color);
                gameBoard.gameCells[cpuCell].style.backgroundColor = this.color;
            }, 200);
        }
    }
    const player1 = new Player("Player 1", gameBoard.markersArray[0], gameBoard.colorsArray[0], 0);
    const player2 = new Player("Player 2", gameBoard.markersArray[1], gameBoard.colorsArray[1], 0);
    return { Player, player1, player2, pSBC };
})();

//* game module
const gameController = (() => {
    let activePlayer = Players.player1;
    let gameMode = "vs";
    let winnerDeclared = false;
    let remainingSpots = 9;
    const endScreen = document.querySelector('.endgame');
    const winScreen = document.querySelector('.win');
    const p1Score = document.querySelectorAll('.scores')[0];
    const p2Score = document.querySelectorAll('.scores')[1];
    const message = document.querySelector('#message');

    const changeActivePlayer = () => {
        activePlayer === Players.player1 ? activePlayer = Players.player2 : activePlayer = Players.player1;
        message.innerText = `${activePlayer.name}, it's your turn`;
        if (gameMode !== "vs" && !winnerDeclared) {
            setTimeout(() => {
            console.log("CPU TURN 8");

                turnCPU();
            }, 1000);
        }
    };

    const checkWinner = (player) => {
        gameBoard.boards.winningBoards.forEach((e, i, ar) => {
            if (gameBoard.boards.playedBoard[e[0]] === player.marker && gameBoard.boards.playedBoard[e[1]] === player.marker && gameBoard.boards.playedBoard[e[2]] === player.marker) {
                winnerDeclared = true;
                setTimeout(() => {
                    gameBoard.gameCells.forEach((e) => {
                        e.style.opacity = 0.3;})
                },500)
                setTimeout(() => {
                    e.forEach((x) => {
                        gameBoard.gameCells[x].style.opacity = 1;
                        gameBoard.gameCells[x].style.boxShadow = `inset 0 0 4px 3px ${Players.pSBC(-0.55, player.color)}`;
                        gameBoard.gameCells[x].style.borderColor = Players.pSBC(-0.55, player.color);

                    });
                }, 500);
                setTimeout(() => {
                    endScreen.classList.remove('hidden');
                    winScreen.classList.remove('hidden');
                    winScreen.style.background = player.color;
                    winScreen.firstChild.innerText = `The winner is 
                    ${player.name}!`;
                    player.score++;
                    drawScores();
                    changeActivePlayer();
                }, 1200);
            }
        });
        if (remainingSpots === 0 && !winnerDeclared) {
            endScreen.classList.remove('hidden');
            winScreen.style.background = `linear-gradient(180deg, ${Players.player1.color} 0%, ${Players.player2.color} 100%)`;
            winScreen.firstChild.innerText = `It's a draw!`;
            winScreen.classList.remove('hidden');
            winnerDeclared = true;
        };
    };
    const gameTurn = (event) => {
        if (event.target.classList.contains('cell') && !winnerDeclared && !event.target.classList.contains('clicked')) {
            let id = event.target.dataset.id;
            activePlayer.turn(id);
            remainingSpots--;
            checkWinner(activePlayer);
            changeActivePlayer();
            if (!winnerDeclared) {
                cpuTurn();
            }
        }
    };
    const cpuTurn = () => {
        if (gameController.gameMode !== "vs" && activePlayer === Players.player2 && !winnerDeclared) {
            setTimeout(() => {
                Players.player2.turnCPU();
                remainingSpots--;
            }, 600);
            setTimeout(() => {
                checkWinner(activePlayer);
                changeActivePlayer();
            }, 800);
        }
    };
    const drawScores = () => {
        p1Score.innerHTML = `${Players.player1.name}: <span id="p1score">${Players.player1.score}</span>`;
        p2Score.innerHTML = `${Players.player2.name}: <span id="p2score">${Players.player2.score}</span>`;
    };
    const nextRound = () => {
        gameBoard.boards.playedBoard.length = 0;
        gameBoard.boards.playedBoard.length = 9;
        message.innerText = `${activePlayer.name}, it's your turn`;
        winnerDeclared = false;
        remainingSpots = 9;
        endScreen.classList.add('hidden');
        winScreen.classList.add('hidden');
        gameBoard.resetGameCells();
        gameBoard.drawGameBoard();
        changeActivePlayer();
        cpuTurn();
    };

    return { changeActivePlayer, gameTurn, endScreen, winScreen, nextRound, drawScores, winnerDeclared, activePlayer, remainingSpots };
})();

//*settings and buttons module 
const Interface = (() => {
    const mainscreen = document.querySelector('.mainscreen');
    const squares = document.querySelector('.gameboard');
    const squaresInfo = document.querySelector('.gameboard-info');
    const settingsscreen = document.querySelector('.settingsscreen');
    const btnBackToMain = document.querySelector('.backtomain');
    const playGameBtn = document.querySelector('#playgame');
    const settingsAccept = document.querySelector('.settingsaccept');
    const settingsBtn = document.querySelector('#settings');
    const p1Name = document.querySelector('#player1name');
    const p2Name = document.querySelector('#player2name');
    const resetScoreBtn = document.querySelector('.resetscore');
    const nextRoundBtn = document.querySelector('.nextround');
    const p1Marker = document.querySelector('#player1marker');
    const p2Marker = document.querySelector('#player2marker');

    playGameBtn.addEventListener('click', () => {
        mainscreen.classList.toggle('hideleft');
        squares.classList.toggle('showleft');
        squaresInfo.classList.toggle('showleft');
        message.innerText = `${Players.player1.name}, it's your turn`;
        gameController.drawScores();
    });
    settingsBtn.addEventListener('click', () => {
        mainscreen.classList.toggle('hideright');
        settingsscreen.classList.toggle('showright');
    });
    settingsAccept.addEventListener('click', () => {
        if (Players.player1.marker === Players.player2.marker) {
            alert("Select different markers!");
        } else {
            mainscreen.classList.remove('hideright');
            mainscreen.classList.add('showleft');
            settingsscreen.classList.remove('showright');
            settingsscreen.classList.add('hideleft');
            defaultClasses();
            p1Name.value ? Players.player1.name = p1Name.value : Players.player1.name = "Player 1";
            p2Name.value ? Players.player2.name = p2Name.value : Players.player2.name = "Player 2";
            document.querySelector('#gamemode').checked === false ? gameController.gameMode = "vs" : gameController.gameMode = "ai";
            gameBoard.resetGameCells();
            gameController.changeActivePlayer();
            setTimeout(() => {
                gameController.nextRound();
            }, 1500);
        }
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

    nextRoundBtn.addEventListener('click', () => {
        gameController.nextRound();
    });

    resetScoreBtn.addEventListener('click', () => {
        gameController.winnerDeclared = false;
        Players.player1.score = 0;
        Players.player2.score = 0;
        gameController.drawScores();
        gameBoard.resetGameCells();
        gameController.nextRound();
    });

    function defaultClasses() {
        gameController.endScreen.className = "endgame hidden";
        gameController.winScreen.className = "win hidden";
        setTimeout(() => {
            squares.className = "gameboard";
            squaresInfo.className = "gameboard-info";
            mainscreen.className = "mainscreen";
            settingsscreen.className = "settingsscreen";
        }, 720);
    }

    function selectedOption(option) {
        option.classList.add('selectedOption');
    }

    const marker1Div = document.querySelector('#player1marker');
    const p2MarkersHolder = document.querySelector('#player2markers fieldset');

    for (const mark of gameBoard.markersArray) {
        const marker = document.createElement('div');
        marker.innerText = mark;
        marker.setAttribute("data-mark", mark);
        marker.classList.add("settingsmarker");
        marker1Div.append(marker);
    }
    let p2Marks = marker1Div.cloneNode(true);
    p2Marks.setAttribute("id", "player2marker");
    p2MarkersHolder.append(p2Marks);


    const color1Div = document.querySelector('#player1color');
    const p2ColorsHolder = document.querySelector('#player2colors > fieldset');

    gameBoard.colorsArray.forEach((e, i, ar) => {
        const color = document.createElement('div');
        color.style.backgroundColor = e;
        color.setAttribute("data-color", i);
        color.classList.add("settingscolor");
        color1Div.append(color);
    });
    let p2Colors = color1Div.cloneNode(true);
    p2Colors.setAttribute("id", "player2color");
    p2ColorsHolder.append(p2Colors);

    const color2Div = document.querySelector('#player2color');
    const marker2Div = document.querySelector('#player2marker');
    selectedOption(color1Div.childNodes[0]);
    selectedOption(color2Div.childNodes[1]);
    selectedOption(marker1Div.childNodes[0]);
    selectedOption(marker2Div.childNodes[1]);

    color1Div.childNodes.forEach((e, i, ar) => {
        e.addEventListener('click', () => {
            ar.forEach(x => {
                x.className = "settingscolor";
            });
            Players.player1.color = gameBoard.colorsArray[i];
            e.className = "settingscolor";
            selectedOption(e);
        });
    });
    color2Div.childNodes.forEach((e, i, ar) => {
        e.addEventListener('click', () => {
            ar.forEach(x => {
                x.className = "settingscolor";
            });
            Players.player2.color = gameBoard.colorsArray[i];
            e.className = "settingscolor";
            selectedOption(e);
        });
    });
    marker1Div.childNodes.forEach((e, i, ar) => {
        e.addEventListener('click', () => {
            ar.forEach(x => {
                x.className = "settingscolor";
            });
            Players.player1.marker = gameBoard.markersArray[i];
            e.className = "settingscolor";
            selectedOption(e);
        });
    });
    marker2Div.childNodes.forEach((e, i, ar) => {
        e.addEventListener('click', () => {
            ar.forEach(x => {
                x.className = "settingscolor";
            });
            Players.player2.marker = gameBoard.markersArray[i];
            e.className = "settingscolor";
            selectedOption(e);
        });
    });
    return { marker1Div, color1Div, color2Div };
})();


