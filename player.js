let player = [{
    symbol: "O",
    score: 0,
    turn: true,
    },
    {
        symbol:"X",
        turn:false,
        score:0,
    }
    ];


let computer = {
    symbol: "X",
    score : 0,
    isTriggered : true,
};


function clickTrigger(e)
{
        let x = document.getElementById(e.id);
        document.getElementById(e.id).style.pointerEvents = 'none';

        if(computer.isTriggered)
        {
                x.innerHTML = player[0].symbol;
                checkForEnd(e.parentNode.rowIndex,e.cellIndex,player[0]);
                computerPlay();
        }
        else if(player[0].turn)
        {
            playTurn( x, e, player[0], player[1]);
        }
        else{
            playTurn( x, e, player[1], player[0]);
        }

}


function computerPlay()
{
    let row = Math.floor(Math.random() * ROWS_COLS_LENGTH);
    let col = Math.floor(Math.random() * ROWS_COLS_LENGTH);
    while(matrix[row][col])
    {
        row = Math.floor(Math.random() * ROWS_COLS_LENGTH);
        col = Math.floor(Math.random() * ROWS_COLS_LENGTH);
    }
    document.getElementById("table").rows[row].cells[col].innerHTML = computer.symbol;
    document.getElementById("table").rows[row].cells[col].style.pointerEvents = "none";
    checkForEnd(row,col,computer);

}


function playTurn(x, e, currentPlayer, secondPlayer) {
    x.innerHTML = currentPlayer.symbol;
    currentPlayer.turn = false;
    secondPlayer.turn = true;
    checkForEnd(e.parentNode.rowIndex,e.cellIndex,currentPlayer);
}



function checkForEnd(rowIndex,cellIndex,currentPlayer) {

     if(checkForWin(rowIndex, cellIndex, currentPlayer.symbol))
     {
            deleteValuesInTable();
            ++currentPlayer.score;
            writeScoreInHtml();
     }
     else if(checkDraw())
     {
            deleteValuesInTable();

     }
}


function writeScoreInHtml() {
    document.getElementById("firstPlayerScore").innerHTML = player[0].score;
    if (!computer.isTriggered) {
        document.getElementById("secondPlayerScore").innerHTML = player[1].score;
    }else{
        document.getElementById("secondPlayerScore").innerHTML = computer.score;
    }
}


function deleteValuesInTable() {
    let table = document.getElementById("table");

    for (let i = 0; i < ROWS_COLS_LENGTH; i++) {

        for (let j = 0; j < ROWS_COLS_LENGTH; j++) {

            table.rows[i].cells[j].innerHTML = null;
            let id = table.rows[i].cells[j].id;
            document.getElementById(id).style.pointerEvents = 'auto';

        }
    }
    initMatrix();
}


function changePlayer(e) {

    if(e.id === "computer")
    {
        let x  = document.getElementById("player").style.display = "inline-block";
        computer.isTriggered = false;
    }else if(e.id === "player")
    {
        let x  = document.getElementById("computer").style.display = "inline-block";
        computer.isTriggered = true;
    }

    e.style.display = "none";
    player[0].score = 0;
    player[1].score = 0;
    computer.score = 0;
    writeScoreInHtml();
    deleteValuesInTable();

}

function evaluate(board) {
    let x = evaluateRow();
    if(x !== 0){
        return x;
    }
    x = evaluateCol();
    if(x !== 0)
    {
        return x;
    }
    x =evaluateDiagonals();
        return x;
}



function minimax(depth  , isMax) {
    let score = evaluate(matrix);
    if(score === 10  ||  score === -10)
    {
        return score;
    }

    if (checkDraw())
    {
        return 0;//draw
    }

    if(isMax)
    {
        let best = -10000;
           for (let i = 0; i<3; i++)
        {
            for (let j = 0; j<3; j++)
            {
                // Check if cell is empty
                if (!matrix[i][j])
                {
                    // Make the move
                    matrix[i][j] = "O";

                    // Call minimax recursively and choose
                    // the maximum value
                    best = Math.max( best,
                        minimax(matrix, depth+1, !isMax) );

                    // Undo the move
                    matrix[i][j] = ' ';
                }
            }
        }
        return best;
    }
    else {
         let best = 1000;

        // Traverse all cells
        for (let i = 0; i<3; i++)
        {
            for (let j = 0; j<3; j++)
            {
                // Check if cell is empty
                if (!matrix[i][j])
                {
                    // Make the move
                    matrix[i][j] = "X";

                    // Call minimax recursively and choose
                    // the minimum value
                    best = Math.max(best,
                           minimax(matrix, depth+1, !isMax));

                    // Undo the move
                    matrix[i][j] = ' ';
                }
            }
        }
        return best;
    }

}


function findBestMove() {
    let bestVal = -1000;
    let bestMove;
    bestMove.row = -1;
    bestMove.col = -1;
    for (let i = 0; i<3; i++)
    {
        for (let j = 0; j<3; j++)
        {
            // Check if cell is empty
            if (!matrix[i][j])
            {
                // Make the move
                matrix[i][j] = "O";

                // compute evaluation function for this
                // move.
                let moveVal = minimax(matrix, 0, false);

                // Undo the move
                matrix[i][j] = '_';

                // If the value of the current move is
                // more than the best value, then update
                // best/
                if (moveVal > bestVal)
                {
                    bestMove.row = i;
                    bestMove.col = j;
                    bestVal = moveVal;
                }
            }
        }
    }//to do
    return bestMove;
}


