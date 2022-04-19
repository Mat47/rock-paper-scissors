console.log("Welcome to Odin's Rock Paper Scissors project.");

/* TS compiles its enum type into this (enum-like) JS object
const Choice = {
    Rock: 'Rock',
    Paper: 'Paper',
    Scissors: 'Scissors'
};
*/
const CHOICES = ['rock', 'paper', 'scissors'];
const OUTCOMES = ['win', 'loss', 'draw'];

function computerPlay()
{
    //console.log( CHOICES[Math.floor(Math.random() * CHOICES.length)] );
    return CHOICES[Math.floor(Math.random() * CHOICES.length)];
}

function playRound(playerSelection, computerSelection) 
{
    console.log(playerSelection + " vs " + computerSelection);

    playerSelection = playerSelection.toLowerCase();
    computerSelection = computerSelection.toLowerCase();

    if(playerSelection == computerSelection)
    {
        return 0; // draw
    }
    else if(
        !CHOICES.includes(playerSelection) ||
        playerSelection == CHOICES[0] && computerSelection == CHOICES[1] ||
        playerSelection == CHOICES[1] && computerSelection == CHOICES[2] ||
        playerSelection == CHOICES[2] && computerSelection == CHOICES[0] )
    {
        return 2; // loss
    }
    else if(
        playerSelection == CHOICES[0] && computerSelection == CHOICES[2] ||
        playerSelection == CHOICES[1] && computerSelection == CHOICES[0] ||
        playerSelection == CHOICES[2] && computerSelection == CHOICES[1] )
    {
        return 1; // win
    }
    return -1; // invalid game
}

function game()
{
    let playerScore = 0;
    let computerScore = 0;

    for( let i = 0; i < 5; i++ )
    {
        const playerSelection = prompt("What is your choice?");
        const computerSelection = computerPlay();
        
        switch( playRound(playerSelection, computerSelection) )
        {
            case 0: // draw
                break;
            case 1:
                playerScore++;
                break;
            case 2:
                computerScore++;
                break;
            default:
                console.log("Invalid Game!");
        }
    }

    console.log(`Player: ${playerScore}\nComputer: ${computerScore}`);
}

//game();

const divChoices = document.querySelector('#choices');
const btnChoice = document.querySelectorAll('.choice');

btnChoice.forEach(btn => {
    btn.style.backgroundColor = '#00ff00';
    btn.addEventListener('click', () => playRound(btn.textContent, computerPlay()));
});
