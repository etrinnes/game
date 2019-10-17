import { getRandomInt } from './utils';

let squares: NodeListOf<HTMLDivElement>;
export function runApp() {
    console.log('ready to party');

    // find all the squares
    squares = document.querySelectorAll('.square') as NodeListOf<HTMLDivElement>;
    const secret = getSecretNumber();

    squares.forEach((sq, index) => {
        if (index === secret) {
            sq.dataset.secret = 'true';  // the dataset api only takes strings
        }
        sq.addEventListener('click', handleClick);
    });

    // Pick one as the secret square and "mark it"

    // Make it so that when the player clicks the square
}

function handleClick() {
    const clickedSquare = this as HTMLDivElement;
    if (clickedSquare.dataset.secret === 'true') {
        clickedSquare.classList.add('winner');
        const message = document.getElementById('message') as HTMLElement;
        message.innerText = 'WowwWWWWWwwwwwWw you found ittttttttttttt';
        squares.forEach(s => {
            if (s !== clickedSquare) {
                s.classList.add('loser');
            }
        });
    } else {
        clickedSquare.classList.add('loser');
    }
    console.log(this);
}

function getSecretNumber() {
    return getRandomInt(0, 5);
}
