const instButtons = document.querySelectorAll('.instructions');
const messageButtons = document.querySelectorAll('.messages');
const popInst = document.querySelector('#pop-inst');
const popMessage = document.querySelector('#pop-message');
const titleMessage = document.querySelector('#pop-message>h4');
const roundsMessage = document.querySelector('#rounds-message');
const userRoundsMessage = document.querySelector('#user-score-message');
const computerRoundsMessage = document.querySelector('#computer-score-message');
const playOptions = document.querySelectorAll('.options-container>div')
const computerOptions = document.querySelectorAll(`.computer-options>div`);
const startButton = document.querySelector('#start');
const rounds = document.querySelector('#rounds');
let finished = false;
let roundNumber = 0;
let roundsToWin;
let userScore = 0;
let computerScore = 0;

function startGame() {
    playOptions.forEach(div => div.addEventListener('click', game));
}

function reloadOptions() {
    computerOptions.forEach(option => option.classList.remove('invisible'));
    playOptions.forEach(option => option.classList.remove('invisible'));
}

function finishGame() {
    if (finished) {
        finished = false;
        userScore = 0;
        roundNumber = 0;
        computerScore = 0;
        startButton.textContent = "Start Game";
        startButton.classList.remove('red')
        startButton.removeEventListener('click', stop);
        startButton.addEventListener('click', startStop);
        reloadOptions();
    } else {
        let winner = "";
        if (userScore > computerScore) {
            winner = 'You win!!!!!!!';
        } else if (userScore < computerScore) {
            winner = 'You lose!!!!!!!';
        } else {
            winner = 'Draw!!!!!!!!!';
        }
        titleMessage.textContent = winner;
        roundsMessage.textContent = "";
        userRoundsMessage.textContent = `Your score: ${userScore}`;
        computerRoundsMessage.textContent = `Computer score: ${computerScore}`;
        popMessage.classList.remove('hideInstructions');
        finished = true
    }
}

function computerDecision() {
    let option = Math.floor(Math.random() * 3);
    switch (option) {
        case 0:
            return ('c-rock')
        case 1:
            return ('c-paper')
        case 2:
            return ('c-scissors')
    }
}

function winner(computer, user) {
    if (computer.substring(2, computer.length) === user) {
        return 'draw';
    }
    switch (user) {
        case "rock":
            if (computer === 'c-paper') {
                computerScore++;
                return 'Computer'
            } else {
                userScore++
                return 'You'
            }
        case "paper":
            if (computer === 'c-scissors') {
                computerScore++;
                return 'Computer'
            } else {
                userScore++
                return 'You'
            }
        case "scissors":
            if (computer === 'c-rock') {
                computerScore++;
                return 'Computer'
            } else {
                userScore++
                return 'You'
            }
    }
}

function game(e) {
    roundNumber++;
    let computerBet = computerDecision();
    playOptions.forEach(div => div.removeEventListener('click', game));
    computerOptions.forEach(option => option.id !== computerBet ? option.classList.toggle('invisible') : null)
    playOptions.forEach(option => option.id !== e.target.offsetParent.id ? option.classList.toggle('invisible') : null)
    let win = (winner(computerBet, e.target.offsetParent.id))
    titleMessage.textContent = win === 'draw' ? 'You draw' : `${win} win!!!!!!`;
    roundsMessage.textContent = `Round: ${roundNumber}`;
    userRoundsMessage.textContent = `You: ${userScore}`;
    computerRoundsMessage.textContent = `Computer: ${computerScore}`;
    setTimeout(function() {
        popMessage.classList.remove('hideInstructions');
    },2000)
}

function continueGame() {
    popMessage.classList.toggle('hideInstructions')
    if (userScore < roundsToWin && computerScore < roundsToWin) {
        reloadOptions();
        startGame();
    } else {
        finishGame();
    }
}
function stop() {
    playOptions.forEach(div => div.removeEventListener('click', game));
    finished = true;
    finishGame();
}
function startStop() {
    let roundsList = document.querySelectorAll('[name="rounds"]');
    roundsList.forEach((rounds) => rounds.checked ? roundsToWin = rounds.value : null);
    startButton.textContent = "Leave Game";
    startButton.removeEventListener('click', startStop);
    startButton.addEventListener('click', stop);
    startButton.classList.add('red')
    startGame();
}
startButton.addEventListener('click', startStop);
instButtons.forEach(button => button.addEventListener('click', () => popInst.classList.toggle('hideInstructions')));
messageButtons.forEach(button => button.addEventListener('click', continueGame));
