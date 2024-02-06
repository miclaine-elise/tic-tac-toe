
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
    // const getCurrentPlayer = () => currentPlayer;
    let gameover = false;
    const board = Gameboard();
    console.table(board.getBoard());
    function playTurn(currentPlayer) {
        console.log(currentPlayer.name + "'s turn");
        do {
            column = prompt("Enter which column to place your marker.");
            row = prompt("Enter which row to place your marker.");
            // checkCellAvailability(row, column);
        }
        while (!checkCellAvailability(row, column));
        board.addMarker(row - 1, column - 1, currentPlayer.marker);
        console.table(board.getBoard());
    }
    function checkCellAvailability(row, column) {
        let cell = board.getBoard()[row - 1][column - 1];
        if (cell !== '') {
            console.log("Cell already taken, choose another.")
            return false;
        }
        return true;
    }
    const switchPlayerTurn = () => {
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    };
    function checkForWinner() {
        const currentMarker = currentPlayer.marker;
        if (checkRows() || checkColumns() || checkDiagonals()) {
            gameover = true;
            console.log("Gameover" + currentPlayer.name + " wins");
        };
        function checkMarkers(marker) {
            return marker === currentMarker;
        }
        function checkRows() {
            for (let row = 0; row < 3; row++) {
                const boardRow = board.getBoard()[row];
                if (boardRow.every(checkMarkers)) {
                    return true;
                }
            }
            return false;
        }

        function checkColumns() {
            for (let column = 0; column < 3; column++) {
                const boardColumn = board.getBoard().map(d => d[column]);
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
            let diagonal2 = [];
            diagonal2[0] = board.getBoard()[0][2];
            diagonal2[1] = board.getBoard()[1][1];
            diagonal2[2] = board.getBoard()[2][0];
            if (diagonal1.every(checkMarkers)) {
                return true;
            } else if (diagonal2.every(checkMarkers)) {
                return true;
            }
        }
    }

    while (gameover == false) {
        playTurn(currentPlayer);
        checkForWinner();
        switchPlayerTurn();
    }
    // return { currentPlayer } Not sure if I will need this yet
}
GameController();
