const photos = ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg','7.jpg','8.jpg','9.jpg','10.jpg','11.jpg','12.jpg','13.jpg','14.jpg','15.jpg','16.jpg','17.jpg','18.jpg'];
let cards = [...photos, ...photos];
let flippedCards = [];
let matchedCount = 0;
let musicStarted = false;

cards.sort(() => Math.random() - 0.5);

const board = document.getElementById('game-board');
const gameMusic = document.getElementById('bg-music');
const celebMusic = document.getElementById('celebration-music');

cards.forEach((photo) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `<div class="card-front"></div><div class="card-back"><img src="${photo}" onerror="this.src='1.jpg'"></div>`;
    card.addEventListener('click', () => {
        if (!musicStarted) { gameMusic.play(); musicStarted = true; }
        flipCard(card);
    });
    board.appendChild(card);
});

function flipCard(card) {
    if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
        card.classList.add('flipped');
        flippedCards.push(card);
        if (flippedCards.length === 2) checkMatch();
    }
}

function checkMatch() {
    const [c1, c2] = flippedCards;
    if (c1.querySelector('img').src === c2.querySelector('img').src) {
        matchedCount += 2;
        flippedCards = [];
        if (matchedCount === cards.length) setTimeout(() => {
            document.getElementById('game-screen').classList.add('hidden');
            document.getElementById('proposal-screen').classList.remove('hidden');
        }, 1000);
    } else {
        setTimeout(() => { c1.classList.remove('flipped'); c2.classList.remove('flipped'); flippedCards = []; }, 1000);
    }
}

// Floating Hearts Logic
function createHeart() {
    const container = document.getElementById('heart-bg');
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    const size = Math.random() * 15 + 10;
    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 5 + 5 + "s";
    container.appendChild(heart);
    setTimeout(() => heart.remove(), 10000);
}
setInterval(createHeart, 500);

// Buttons
const noBtn = document.getElementById('no-btn');
noBtn.addEventListener('mouseover', () => {
    noBtn.style.position = 'fixed';
    noBtn.style.left = Math.random() * (window.innerWidth - 100) + 'px';
    noBtn.style.top = Math.random() * (window.innerHeight - 100) + 'px';
});

document.getElementById('yes-btn').addEventListener('click', () => {
    gameMusic.pause();
    celebMusic.play();
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#ff4d6d', '#ffffff'] });
    document.getElementById('proposal-text').innerHTML = "I love you forever! ❤️";
    noBtn.style.display = 'none';
});