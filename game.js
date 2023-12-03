const gameCounter = {
    number: 0,
    wins: 0,
    losses: 0,
    draws: 0
};

const gameResult = {
    playerChoice: '',
    aiChoice: ''
};

const options = document.querySelectorAll('.half-ellipse');
const optionsTab = Array.from(options);

let winner = '';

function playerHand(){
    gameResult.playerChoice = this.dataset.option;
    options.forEach(option => option.style.backgroundColor = '#fbbc56');
    this.style.backgroundColor = 'red';
    return gameResult.playerChoice; 
}

function aiHand(){
    const index = Math.floor(Math.random()*optionsTab.length);
    gameResult.aiChoice = optionsTab[index].dataset.option;
    return gameResult.aiChoice;
}
function whoWon(player, ai){
    if (player === ai ){
        document.querySelector('.draws').textContent = ++gameCounter.draws;
        // eslint-disable-next-line quotes
        winner = `It's a draw !`;
        return 'draw';
    }
    if (player === 'rock' && ai === 'scissors' || player === 'paper' && ai === 'rock' || player === 'scissors' && ai === 'paper'){
        document.querySelector('.wins').textContent = ++gameCounter.wins;
        winner = 'YOU!!!';
        return 'win';
    }
    else{
        document.querySelector('.losses').textContent = ++gameCounter.losses;
        winner = 'Computer :/';
        return 'loss';
    }
}

function showScore(playerChoice, aiChoice){
    document.querySelector('.gameResult').classList.add('active');
    document.querySelector('.player-choice').textContent = playerChoice;
    document.querySelector('.ai-choice').textContent = aiChoice;
    document.querySelector('.who-win').textContent = winner;
}

function endGame(){
    document.querySelector(`[data-option=${gameResult.playerChoice}]`).style.backgroundColor = '';
    gameResult.playerChoice = '';
}
const removeDelay = function(){
    document.querySelector('.gameResult').classList.remove('active');
};
function startGame(){
    if (!gameResult.playerChoice){
        return alert('wybierz opcje');
    }
    aiHand();
    whoWon(gameResult.playerChoice, gameResult.aiChoice);
    document.querySelector('.number').textContent = ++gameCounter.number;
    showScore(gameResult.playerChoice, gameResult.aiChoice);
    endGame();
    setTimeout(removeDelay, 2500);

}

options.forEach(option => option.addEventListener('click', playerHand));

document.body.querySelector('button').addEventListener('click', startGame);