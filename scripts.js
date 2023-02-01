const inst = document.querySelector('#instructions');
const popInst = document.querySelector('#pop-inst');
const playOptions = document.querySelectorAll('.options-container>div')
inst.addEventListener('click', ()=> popInst.classList.toggle('invisible'));
function userOption(e) {
    console.log(e.target.id)
}
playOptions.forEach(div=>div.addEventListener('click',userOption))