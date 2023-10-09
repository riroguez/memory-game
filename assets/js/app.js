const btnNum = document.querySelectorAll('.game-button');
const showMovements = document.querySelector('#movements');
const showSuccesses = document.querySelector('#successes');
const showTime = document.querySelector('#time');
const gameDate = document.querySelector('#gameDate');

document.addEventListener('DOMContentLoaded', () => {
    const currentDate = new Date().getFullYear();
    gameDate.textContent = currentDate;
});

let uncodeCards = 0;
let card1 = null;
let card2 = null;
let firstResult = null;
let secondResult = null;
let movements = 0;
let successes = 0;
let timmer = false;
let timer = 30;
let initTimer = 30;
let regresiveTime = null;

let numbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numbers = numbers.sort(() => {return Math.random() - 0.5});

btnNum.forEach(num => {
    num.addEventListener('click', () => {
        uncover(num.id);
    });
});

function countTime() {
    regresiveTime = setInterval(() => {
        timer--;
        showTime.innerHTML = `Tiempo: ${timer} segundos`; 
        if(timer == 0) {
            clearInterval(regresiveTime);
            unblockCards();
            showTime.innerHTML = 'Se te agoto el tiempo 😔';
        }
    }, 1000);  
}

function unblockCards() {
    for(let i = 0; i <= 15; i++) {
        let cardUnblock = document.getElementById(i);
        cardUnblock.innerHTML = numbers[i];
        cardUnblock.disabled = true;
    }
}

function uncover(id) {
    if(timmer == false) {
        countTime();
        timmer = true;
    }

    uncodeCards++;
    if(uncodeCards == 1) {
        card1 = document.getElementById(id);
        firstResult = numbers[id];
        card1.innerHTML = firstResult;
        card1.disabled = true;
    } else if(uncodeCards == 2) {
        card2 = document.getElementById(id);
        secondResult = numbers[id];
        card2.innerHTML = secondResult;
        card2.disabled = true;
        movements++;
        showMovements.innerHTML = `Movimientos: ${movements}`;

        if(firstResult == secondResult) {
            uncodeCards = 0;
            successes++;
            showSuccesses.innerHTML = `Aciertos: ${successes}`;

            if(successes == 8) {
                clearInterval(regresiveTime);
                showSuccesses.innerHTML = `Aciertos: ${successes} 😱`;
                showTime.innerHTML = `Fantástico 🎉 solo te llevo ${initTimer - timer} segundos`
                showMovements.innerHTML = `Movimientos: ${movements} 🤟🏻😎`;
            }

        } else {
            setTimeout(() => {
                card1.innerHTML = ' ';
                card2.innerHTML = ' ';
                card1.disabled = false;
                card2.disabled = false;
                uncodeCards = 0;
            }, 800);
        }
    }

}