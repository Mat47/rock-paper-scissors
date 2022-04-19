/* TS compiles its enum type into this (enum-like) JS object
const Choice = {
    Rock: 'Rock',
    Paper: 'Paper',
    Scissors: 'Scissors'
};
*/
const CHOICES = [
    {
        name: 'rock',
        symbol: 'R',
        beats: 'scissors'
    },
    {
        name: 'paper',
        symbol: 'P',
        beats: 'rock'
    },
    {
        name: 'scissors',
        symbol: 'S',
        beats: 'paper'
    } 
];

let playerScore = 0;
let computerScore = 0;
const playerScoreDisplay = document.querySelector("#player-score");
const computerScoreDisplay = document.querySelector("#computer-score");

function computerChoice()
{
    return CHOICES[Math.floor(Math.random() * CHOICES.length)];
}

function playRound(playerSelection, computerSelection) 
{
    const matchDisplay = document.createElement('div');
    matchDisplay.textContent = playerSelection.symbol + ' vs ' + computerSelection.symbol;
    document.querySelector('#match').append(matchDisplay);

    if (playerSelection.beats == computerSelection.name) return 1;
    if (playerSelection.name == computerSelection.beats) return 2;
    return 0;  
}

function resetGame()
{
    playerScore = 0;
    computerScore = 0;
    playerScoreDisplay.textContent = 0;
    computerScoreDisplay.textContent = 0;
}

function announceWinner()
{
    playerScore > computerScore ? alert("You win!") : alert('You lose!');
    resetGame();
}

function rps(playerChoiceStr)
{
    const result = playRound( CHOICES.find( choice => choice.name == playerChoiceStr), computerChoice() );

    switch(result)
    {
        case 0:
            console.log('draw')
            break;
        case 1:
            playerScoreDisplay.textContent = ++playerScore;
            break;
        case 2:
            computerScoreDisplay.textContent = ++computerScore;
            break;
        default:
            console.log("Invalid Game!");
    }

    if (playerScore >= 5 || computerScore >= 5) 
    { 
        announceWinner();
    };
}

const btnChoice = document.querySelectorAll('.choice');

btnChoice.forEach(btn => {
    //btn.style.backgroundColor = '#00ff00';
    btn.addEventListener('click', () => rps(btn.textContent.toLowerCase()));
});
