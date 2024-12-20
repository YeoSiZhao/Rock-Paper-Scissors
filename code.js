import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

let scoreboard = JSON.parse(localStorage.getItem('scoreboard')) || {
    wins: 0,
    losses: 0,
    ties: 0
  };

let gameHistory = JSON.parse(localStorage.getItem('gameHistory')) || [];

document.querySelector('.js-rock-button').addEventListener('click', () => {
    playGame('Rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
    playGame('Paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
    playGame('Scissors');
});

document.querySelector('.reset-button').addEventListener('click', () => {
    scoreboard = {
        wins: 0,
        losses: 0,
        ties: 0
    };

    gameHistory = [];

    localStorage.setItem('scoreboard', JSON.stringify(scoreboard));
    localStorage.setItem('gameHistory', JSON.stringify(gameHistory));

    updateScores();
    showHistory();
    clean();
});


function generateComputerMove() {
    let computerMove = '';
    const randomNum = Math.random();
    if (randomNum <= 0.33)
    {
        computerMove = 'Rock';
    }
     else if (0.33 < randomNum && randomNum < 0.66)
    {
        computerMove = 'Paper';
    }
    else 
    {
        computerMove = 'Scissors';
    }
    return computerMove;
}

function calculateScores(result) {
    if (result === 'win')
    {
        scoreboard.wins += 1;
    }
    else if (result === 'lose')
    {
        scoreboard.losses += 1;
    }
    else if (result === 'tie')
    {
        scoreboard.ties += 1;
    }
}

function updateScores(){
    document.querySelector('.js-scoreboard').innerHTML =`Wins: ${scoreboard.wins}, Losses: ${scoreboard.losses}, Ties: ${scoreboard.ties}`;
}

function showResults(playerMove,computerMove,result){
    document.querySelector('.js-result').innerHTML =`You picked ${playerMove}. Computer Picked ${computerMove}. You ${result}.`
}

function showHistory() {
    
    // Create a table to display the history
    let tableHTML = `
        <table>
            <tr>
                <th>#</th>
                <th>Date</th>
                <th>Player Choice</th>
                <th>Computer Choice</th>
                <th>Result</th>
            </tr>
    `;
    for (let i = 0; i < gameHistory.length; i+= 1 ) {
        tableHTML += `
        <tr>
            <td>${i + 1}</td>
            <td>${gameHistory[i].Date}</td>
            <td>${gameHistory[i].PlayerChoice}</td>
            <td>${gameHistory[i].ComputerChoice}</td>
            <td>${gameHistory[i].Result}</td>
        </tr>
    `;  
    };

    tableHTML += '</table>';
    document.querySelector('.game-history').innerHTML = tableHTML;
}

function clean() {
    document.querySelector('.js-result').innerHTML = '';
    document.querySelector('.js-scoreboard').innerHTML = '';
    document.querySelector('.game-history').innerHTML = '';
}

function playGame(playerMove){
    showHistory() 
    const computerMove = generateComputerMove();
    let result = ' ';

    if (playerMove === 'Rock')
    {
        if (computerMove === 'Rock')
        {
            result = 'tie';
        }
        else if (computerMove === 'Paper')
        {
            result = 'lose';
        }
        else if (computerMove === 'Scissors')
        {
            result = 'win';
        }
    }
    else if (playerMove === 'Paper')
    {
        if (computerMove === 'Rock')
        {
            result = 'win';
        }
        else if (computerMove === 'Paper')
        {
            result = 'tie';
        }
        else if (computerMove === 'Scissors')
        {
            result = 'lose';
        }
    }
    else if (playerMove === 'Scissors')
    {
        if (computerMove === 'Rock')
        {
            result = 'lose';
        }
        else if (computerMove === 'Paper')
        {
            result = 'win';
        }
        else if (computerMove === 'Scissors')
        {
            result = 'tie';
        }
    }   
    calculateScores(result); 
//--------------------------------------------

//Game History
    const now = dayjs().format('DD MMMM YYYY, h:mm A');
    let record = {
        Date: now,
        PlayerChoice: playerMove,
        ComputerChoice: computerMove,
        Result: result
    };

    gameHistory.push(record);
    localStorage.setItem('gameHistory', JSON.stringify(gameHistory));
    
    showHistory() 

//Scoreboard
    localStorage.setItem('scoreboard', JSON.stringify(scoreboard));

    updateScores();
    showResults(playerMove,computerMove,result);
}

