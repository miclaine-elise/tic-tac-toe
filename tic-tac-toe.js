
function Gameboard() {
    const rows = 3;
    const columns = 3;
    let board = [];
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push("");
        }
    }
    const getBoard = () => board;
    const addMarker = (row, column, marker) => board[row][column] = marker;
    const deleteBoard = () => board = [["", "", ""], ["", "", ""], ["", "", ""]];
    return { getBoard, addMarker, deleteBoard };

}

function GameController() {
    const players = [
        {
            name: "Player One",
            marker: "X"
        },
        {
            name: "Player Two",
            marker: "O"
        }];
    let currentPlayer = players[0]; //Initiliaze current player to player[0]
    const getCurrentPlayer = () => currentPlayer;
    let gameover = false;
    let tieGame = false;
    const getGameStatus = () => gameover;
    const getTieGameStatus = () => tieGame;
    let board = Gameboard();
    function resetBoard() {
        board.deleteBoard();
        gameover = false;
        tieGame = false;
        currentPlayer = players[0];
    }
    function playTurn(row, column) {
        board.addMarker(row - 1, column - 1, currentPlayer.marker);
        console.table(board.getBoard());
        checkForWinner();
        if (!checkForWinner) {
            checkForTie();
        }
    }
    const switchPlayerTurn = () => {
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    };
    function checkForWinner() {
        const currentMarker = currentPlayer.marker;
        console.log("checkrows:" + checkRows() + " checkColumns:" + checkColumns() + " checkDiagonals:" + checkDiagonals());

        if (checkRows() || checkColumns() || checkDiagonals()) {
            gameover = true;
        }
        function checkMarkers(marker) {
            return marker === currentMarker;
        }
        function checkRows() {
            for (let row = 0; row < 3; row++) {
                let boardRow = board.getBoard()[row];
                console.table("rows: " + boardRow);
                if (boardRow.every(checkMarkers)) {
                    return true;
                }
            }
            return false;
        }

        function checkColumns() {
            for (let column = 0; column < 3; column++) {
                let boardColumn = board.getBoard().map(d => d[column]);
                console.table("column: " + boardColumn);
                if (boardColumn.every(checkMarkers)) {
                    return true;
                }
            }
            return false;
        }

        function checkDiagonals() {
            let diagonal1 = [];
            diagonal1[0] = board.getBoard()[0][0];
            diagonal1[1] = board.getBoard()[1][1];
            diagonal1[2] = board.getBoard()[2][2];
            console.table("diagonal1: " + diagonal1)
            let diagonal2 = [];
            diagonal2[0] = board.getBoard()[0][2];
            diagonal2[1] = board.getBoard()[1][1];
            diagonal2[2] = board.getBoard()[2][0];
            console.table("diagonal2: " + diagonal2)

            if (diagonal1.every(checkMarkers)) {
                return true;
            } else if (diagonal2.every(checkMarkers)) {
                return true;
            }
            return false;
        }
        console.log("gamestatus:" + gameover);

    }
    function checkForTie() {
        console.log("tiegame: " + tieGame);

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board.getBoard()[i][j] === '') {
                    return false;
                }
            }
        }
        tieGame = true;
        gameover = true;
        return true;
    }
    return { getCurrentPlayer, playTurn, switchPlayerTurn, getGameStatus, getTieGameStatus, resetBoard }
}

function screenController() {
    const gameOverWindow = document.querySelector('dialog');
    const winnerMessage = document.querySelector('#winner-message');
    const restartBtn = document.querySelector('#restart');
    const cells = document.querySelectorAll('.cell');
    const controller = GameController();
    currentPlayer = controller.getCurrentPlayer();
    for (let i = 1; i < 4; i++) {
        for (let j = 1; j < 4; j++) {
            eval("var row" + i + "col" + j + " = " + "document.querySelector('.row" + i + ".column" + j + "')");
        }
    }
    displayBoard();
    function displayBoard() {
        for (i = 0; i <= cells.length - 1; i++) {
            cells[i].textContent = '';
            cells[i].style.color = "gray";
            cells[i].addEventListener('mouseenter', mouseEnter);
            cells[i].addEventListener('mouseleave', mouseLeave);
            cells[i].addEventListener('mousedown', placeMarker);
        }
    }

    function updateBoard(cell, marker) {
        cell.removeEventListener('mouseenter', mouseEnter);
        cell.removeEventListener('mouseleave', mouseLeave);
        cell.removeEventListener('mousedown', placeMarker);
        cell.textContent = marker;
        cell.style.color = "black";
    }
    function mouseEnter() {
        this.textContent = currentPlayer.marker;
    }
    function mouseLeave() {
        this.textContent = '';
    }
    function placeMarker() {
        currentPlayer = controller.getCurrentPlayer();
        controller.playTurn(this.dataset.row, this.dataset.column);
        updateBoard(this, currentPlayer.marker);
        checkGameOver();
        controller.switchPlayerTurn();
        currentPlayer = controller.getCurrentPlayer();
    }
    function restartGame() {
        gameOverWindow.close();
        restartBtn.removeEventListener("mousedown", restartGame);
        controller.resetBoard();
        currentPlayer = controller.getCurrentPlayer();
        displayBoard();
    }
    function checkGameOver() {
        let gameOver = controller.getGameStatus();
        console.log("gamestatus from checkGame:" + gameOver);
        if (gameOver) {
            console.log("gameOver statement was true");
            let tieGame = controller.getTieGameStatus();
            if (tieGame) {
                console.log("Tie game was true");
                winnerMessage.textContent = "Tie Game!"
            } else {
                console.log("getting inside else statement");
                let winner = controller.getCurrentPlayer();
                winnerMessage.textContent = winner.marker + "'s win!";
            }
            restartBtn.addEventListener("mousedown", restartGame);
            console.log("its getting to gameOverWindow here");
            gameOverWindow.show();
        }
    }
    return { updateBoard }
};
let startBtn = document.querySelector('#start-game');
startBtn.addEventListener("mousedown", function (event) {
    screenController();
});