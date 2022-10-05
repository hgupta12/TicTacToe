// cross - <i class="fas fa-times fa-2x"></i>
// circle - <i class="fa fa-circle-o fa-2x"></i>

const restart = document.querySelector('#restart');
const container = document.querySelector('.container');
const modal = document.querySelector('.modal');
const result = document.querySelector('#result');

let c = 1;
//clicking box
function play(box){
    if(!checkBox(box)){

        updateBox(box);
        restart.style.display='inline-block';
        checkingWinner();
    }
    else{
        showError();
    }
}

function updateBox(box){
    const options = ['<i class="fas fa-times fa-2x" aria-hidden="true"></i>',
        '<i class="fa fa-circle-o fa-2x" aria-hidden="true"></i>']
        c=(++c)%2;
    box.innerHTML = options[c];
    box.classList.add('filled');
    changePlayer();
    
}

function changePlayer(){
    const players = document.querySelectorAll('.player');
    players.forEach((player)=>{
        player.classList.toggle('active-player');
    })
    
}

const checkBox = box => box.classList.contains('filled');

function showError(){
    const message = document.createElement('div');
    message.classList.add('error')
    message.innerHTML = '<p> The box is already filled!</p>'
    const gridArea = document.querySelector('.grid-area');
    container.insertBefore(message, gridArea);
    setTimeout(()=>{
        message.style.display='none';
    },700)

}

function checkingWinner(){
    const boxes = document.querySelectorAll('.box');
//    checking draw
    const filledBoxs  = document.querySelectorAll('.filled')
    if(filledBoxs.length == 9){
        showModal('draw')
    }
    else{

    

    // checking for winner
    const cross ='<i class="fas fa-times fa-2x" aria-hidden="true"></i>'
    const circle = '<i class="fa fa-circle-o fa-2x" aria-hidden="true"></i>';
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
       const box1 = boxes[winCondition[0]].innerHTML;
       const box2 = boxes[winCondition[1]].innerHTML;
       const box3 = boxes[winCondition[2]].innerHTML;
       if(box1=='' || box2=='' || box3==''){

           continue;
        }
    else if(box1==box2 && box2==box3){
            if(box1 == cross)
                showModal('One')
            else
                showModal('Two');
            break;    
        }
        
    }
}


}

function showModal(winner){
    modal.style.display='inline-block';
    result.innerHTML = `<h2>${winner == 'draw' ? 'Its a Draw!' : `Player ${ winner } Won!`}</h2>
            <i class="fas fa-${winner=='draw'?'handshake':'medal'} fa-8x"></i>
            <button class="btn" id="modalBtn">Play Again</button>`
    if(winner=='draw'){
        result.querySelector('h2').style.color='#333';
    }
    // play again
    const modalBtn = document.getElementById('modalBtn');
    modalBtn.addEventListener('click', () => {
        restartGame();
        modal.style.display = 'none';
    })
}
// restart
const restartGame = () => {
    const boxes = document.querySelectorAll('.box');

    boxes.forEach(box => {
        box.innerHTML = '';
        box.classList.remove('filled');

    });
    restart.style.display = 'none';
    const players = document.querySelectorAll('.player');
    players[0].classList.add('active-player');
    players[1].classList.remove('active-player');
    c = 1;
    

};

// event listener
const boxes = document.querySelectorAll('.box');
boxes.forEach(box=>{
    box.addEventListener('click', ()=>{
        play(box)
    });
})


restart.addEventListener('click',restartGame)

// instruction modal

document.getElementById('instructBtn').addEventListener('click', ()=>{
    const inModal = document.querySelector('.modal-instructions');
    inModal.style.display='none';
})


