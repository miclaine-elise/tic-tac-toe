
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
    return { getBoard, addMarker };

}

function GameController() {
    const board = Gameboard();
    console.table(board.getBoard());
    const players = [
        {
            name: "Player One",
            marker: "X"
        },
        {
            name: "Player Two",
            marker: "O"
        }];
    let currentPlayer = players[0];
    function playTurn(currentPlayer) {
        console.log(currentPlayer.name + "'s turn");
        column = prompt("Enter which column to place your marker.");
        row = prompt("Enter which row to place your marker.");
        board.addMarker(row - 1, column - 1, getCurrentPlayer().marker);
        console.table(board.getBoard());
    }
    const switchPlayerTurn = () => {
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    };
    function checkForWinner() {
        const currentMarker = getCurrentPlayer().marker;
        if (checkRows() || checkColumns()) {
            gameover = true;
        };
        function checkMarkers(marker) {
            return marker === currentMarker;
        }
        function checkRows() {
            for (let row = 0; row < 3; row++) {
                const boardRow = board.getBoard()[row];
                if (boardRow.every(checkMarkers)) {
                    console.log("gameover");
                    return true;
                }

            }
            return false;
        }
        function checkColumns() {
            for (let column = 0; column < 3; column++) {
                const boardColumn = board.getBoard().map(d => d[column]);
                if (boardColumn.every(checkMarkers)) {
                    console.log("gameover");
                    return true;
                }
            }
            return false;
        }
    }
    let gameover = false;
    const getCurrentPlayer = () => currentPlayer;
    while (gameover == false) {
        playTurn(currentPlayer);
        checkForWinner();
        switchPlayerTurn();
    }
    return { currentPlayer }
}
GameController();
