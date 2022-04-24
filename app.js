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
    console.clear();
}

function announceWinner()
{
    playerScore > computerScore ? alert("You win!") : alert('You lose!');
    resetGame();
}

function updateMatchDisplay(result)
{   
    const _playerChoice = document.createElement('div');
    _playerChoice.innerText = latestPlayerChoice.symbol;
    _playerChoice.style.display = "inline";
    _playerChoice.style.margin = "0 1em 0 0";

    const _vs = document.createElement('div');
    _vs.innerText = 'v';
    _vs.style.display = "inline";
    //_vs.style.margin = "0 0.5em 0 0.5em";
    _vs.style.fontSize = "0.5em";
    _vs.style.verticalAlign = "middle";

    const _computerChoice = document.createElement('div');
    _computerChoice.innerText = latestComputerChoice.symbol;
    _computerChoice.style.display = "inline";
    _computerChoice.style.margin = "0 0 0 1em";

    const opacityLost = 0.5;
    switch(result)
    {
        case 1:
            _computerChoice.style.opacity = opacityLost;
            break;
        case 2:
            _playerChoice.style.opacity = opacityLost;
            break;
        default:
            _playerChoice.style.opacity = opacityLost;
            _computerChoice.style.opacity = opacityLost;
    }

    const match = document.createElement('div');
    match.style.margin = "0 0 5px 0";
    match.append(_playerChoice);
    match.append(_vs);
    match.append(_computerChoice);
    matchDisplay.prepend(match);
}

async function playRound(playerChoiceStr)
{
    latestPlayerChoice = CHOICES.find( choice => choice.name == playerChoiceStr);
    latestComputerChoice = computerChoice();

    const result = match(latestPlayerChoice, latestComputerChoice);
    switch(result)
    {
        case 0:
            updateMatchDisplay(0);
            break;
        case 1:
            playerScoreDisplay.textContent = ++playerScore;
            updateMatchDisplay(1);
            break;
        case 2:
            computerScoreDisplay.textContent = ++computerScore;
            updateMatchDisplay(2);
            break;
        default:
            console.log("Invalid Game!");
    }
    
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
