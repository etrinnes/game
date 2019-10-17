import { getRandomInt } from './utils';

let squares: NodeListOf<HTMLDivElement>;
let wrongAnswers: number;

export function runApp() {
    console.log('ready to party');
    wrongAnswers = 0;
    // find all the squares
    squares = document.querySelectorAll('.square') as NodeListOf<HTMLDivElement>;
    const secret = getSecretNumber();

    squares.forEach((sq, index) => {
        if (index === secret) {
            sq.dataset.secret = 'true';  // the dataset api only takes strings
        }
        sq.addEventListener('click', handleClick);
    });
}

function handleClick() {
    const clickedSquare = this as HTMLDivElement;
    const message = document.getElementById('message') as HTMLElement;
    if (clickedSquare.dataset.secret === 'true') {
        clickedSquare.classList.add('winner');
        message.innerText = 'WowwWWWWWwwwwwWw you found ittttttttttttt';
        squares.forEach(s => {
            if (s !== clickedSquare) {
                s.classList.add('loser');
                s.removeEventListener('click', handleClick);
            }
        });
    } else {
        clickedSquare.classList.add('loser');
        wrongAnswers++;
        if (squares.length === wrongAnswers + 1) {
            message.innerText = 'YOU LOSE';
            squares.forEach(s => {
                if (!s.classList.contains('loser')) {
                    s.classList.add('winner');
                }
            });
        }
    }
    console.log(this);
}

function getSecretNumber() {
    return getRandomInt(0, 5);
}
