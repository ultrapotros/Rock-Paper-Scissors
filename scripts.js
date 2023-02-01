const instButtons = document.querySelectorAll('.instructions');
const popInst = document.querySelector('#pop-inst');
const playOptions = document.querySelectorAll('.options-container>div')
const computerOptions = document.querySelectorAll(`.computer-options>div`);
const computerDecision = () => Math.floor(Math.random() * 3);

instButtons.forEach(button=>button.addEventListener('click', ()=> popInst.classList.toggle('hideInstructions')));
function userOption(e) {
    console.log(e.target.id)
    let computerBet = computerDecision();
    computerOptions.forEach(option => option.id !== computerBet.toString()? option.classList.toggle('invisible'):null)
    playOptions.forEach(option => option.id !== e.target.id? option.classList.toggle('invisible'):null)
}
playOptions.forEach(div=>div.addEventListener('click',userOption));