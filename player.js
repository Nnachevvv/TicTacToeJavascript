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



function checkForEnd(rowIndex,cellIndex,player) {

     if(checkForWin(rowIndex, cellIndex, player.symbol))
     {
            deleteValuesInTable();
            initMatrix();
            ++player.score;
            writeScoreInHtml();
     }
     else if(checkDraw())
     {
            deleteValuesInTable();
            initMatrix();
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
}


function changePlayer(e) {
    if(e.id === "computer")
    {
        e.style.display = "none";
        let x  = document.getElementById("player").style.display = "inline-block";
        deleteValuesInTable();
        computer.isTriggered = false;
    }else if(e.id === "player")
    {
        e.style.display = "none";
        let x  = document.getElementById("computer").style.display = "inline-block";
        deleteValuesInTable();
        computer.isTriggered = true;
    }
    player[0].score = 0;
    player[1].score = 0;
    computer.score = 0;
    writeScoreInHtml();

}

