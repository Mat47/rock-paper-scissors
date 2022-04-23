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
        symbol: '✊',
        beats: 'scissors'
    },
    {
        name: 'paper',
        symbol: '✋',
        beats: 'rock'
    },
    {
        name: 'scissors',
        symbol: '✌️',
        beats: 'paper'
    } 
];

let latestPlayerChoice;
let playerScore = 0;
const playerScoreDisplay = document.querySelector("#player-score");

let latestComputerChoice;
let computerScore = 0;
const computerScoreDisplay = document.querySelector("#computer-score");

const matchDisplay = document.querySelector('.match');

function computerChoice()
{
    return CHOICES[Math.floor(Math.random() * CHOICES.length)];
}

function match(playerSelection, computerSelection) 
{
    latestPlayerChoice = playerSelection;
    latestComputerChoice = computerSelection;

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
    matchDisplay.innerHTML = '';
}

function announceWinner()
{
    playerScore > computerScore ? alert("You win!") : alert('You lose!');
    resetGame();
}

function updateMatchDisplay()
{
    const currentRoundDiv = document.createElement('div');
    currentRoundDiv.textContent = latestPlayerChoice.symbol + ' vs ' + latestComputerChoice.symbol;
    matchDisplay.append(currentRoundDiv);
}

async function playRound(playerChoiceStr)
{
    latestPlayerChoice = CHOICES.find( choice => choice.name == playerChoiceStr);
    latestComputerChoice = computerChoice();

    const result = match(latestPlayerChoice, latestComputerChoice);
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

    updateMatchDisplay();
    
    if (playerScore >= 5 || computerScore >= 5) 
    { 
        btnChoice.forEach(btn => {
            btn.removeEventListener('click', playRound);
        });
        setTimeout(announceWinner, 0); // wait for DOM to update score
    };
}

const btnChoice = document.querySelectorAll('.choice');

btnChoice.forEach(btn => {
    //btn.style.fontSize = '150%';
    btn.addEventListener('click', () => playRound(btn.id));
});
