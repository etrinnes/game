import { getRandomInt } from './utils';

let squares: NodeListOf<HTMLDivElement>;
let message: HTMLElement;
export function runApp() {
    message = document.getElementById('message') as HTMLElement;

    squares = document.querySelectorAll('.square') as NodeListOf<HTMLDivElement>;
    const secret = getSecretNumber();

    squares.forEach((sq, index) => {
        if (index === secret) {
            sq.dataset.secret = 'true';
        }
        sq.addEventListener('click', handleClick);
    });

}


let tries = 0;

function handleClick(e: any) {
    // console.log(e);
    const clickedSquare = this as HTMLDivElement;
    if (clickedSquare.dataset.secret === 'true') {
        clickedSquare.classList.add('winner');
        message.innerText = 'Woah! Awesome! You Found it! Wow!';
        squares.forEach(s => {
            if (s !== clickedSquare) {
                s.classList.add('loser');
                s.removeEventListener('click', handleClick);
            }
        });
    } else {
        clickedSquare.classList.add('loser');
        tries++;
        if (tries === 5) {
            squares.forEach(sq => {
                if (sq.dataset.secret === 'true') {
                    sq.classList.add('winner');
                } else {
                    sq.classList.add('loser');
                }
                message.innerText = 'Wow! You Suck! I wouldn\'t play the lottery if I were you!';
            });
        }
    }
}


function getSecretNumber() {
    return getRandomInt(0, 5);
}
