const icons = {
    1: ['fa-heart', 'fa-star', 'fa-bell', 'fa-smile', 'fa-moon'],
    2: ['fa-heart', 'fa-star', 'fa-bell', 'fa-smile', 'fa-moon', 'fa-apple-alt', 'fa-anchor', 'fa-bomb'],
    3: ['fa-heart', 'fa-star', 'fa-bell', 'fa-smile', 'fa-moon', 'fa-apple-alt', 'fa-anchor', 'fa-bomb', 'fa-bug', 'fa-car', 'fa-cat', 'fa-cloud'],
    4: ['fa-heart', 'fa-star', 'fa-bell', 'fa-smile', 'fa-moon', 'fa-apple-alt', 'fa-anchor', 'fa-bomb', 'fa-bug', 'fa-car', 'fa-cat', 'fa-cloud', 'fa-crown', 'fa-dice', 'fa-dog', 'fa-dragon'],
    5: ['fa-heart', 'fa-star', 'fa-bell', 'fa-smile', 'fa-moon', 'fa-apple-alt', 'fa-anchor', 'fa-bomb', 'fa-bug', 'fa-car', 'fa-cat', 'fa-cloud', 'fa-crown', 'fa-dice', 'fa-dog', 'fa-dragon', 'fa-feather', 'fa-fish', 'fa-frog', 'fa-gem', 'fa-ghost', 'fa-gift', 'fa-globe', 'fa-guitar', 'fa-hat-wizard', 'fa-ice-cream', 'fa-key', 'fa-leaf', 'fa-lightbulb', 'fa-magic', 'fa-magnet', 'fa-microphone', 'fa-music', 'fa-paw', 'fa-rocket', 'fa-snowflake', 'fa-sun', 'fa-tree', 'fa-umbrella']
};

let attempts = localStorage.getItem('attempts') ? parseInt(localStorage.getItem('attempts')) : 8;
let points = localStorage.getItem('points') ? parseInt(localStorage.getItem('points')) : 0;
document.getElementById('points').textContent = `Points: ${points}`;
document.getElementById('attempts').textContent = `Attempts: ${attempts}`;
let level = 1;

document.getElementById('spin-button').addEventListener('click', spinBoxes);
document.getElementById('level-select').addEventListener('change', (event) => {
    level = parseInt(event.target.value);
    attempts = 8 * level; // Adjust attempts based on level
    localStorage.setItem('attempts', attempts);
    document.getElementById('attempts').textContent = `Attempts: ${attempts}`;
});

document.getElementById('wallet-button-title').addEventListener('click', showWalletPage);

function showWalletPage() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = `
        <!-- Wallet Page -->
        <div class="wallet-page-header">
            <select id="wallet-combobox">
                <option selected>Choose an option</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
            </select>
        </div>
        <div class="wallet-page-content text-center">
            <h2>Wallet Information</h2>
            <p>Your coins: <span id="wallet-coins">0</span></p>
            <button id="back-button"><i class="fas fa-arrow-left"></i></button>
        </div>
    `;
    document.getElementById('back-button').addEventListener('click', () => {
        location.reload();
    });
}

function spinBoxes() {
    if (attempts > 0) {
        attempts--;
        localStorage.setItem('attempts', attempts); // Save updated attempts
        document.getElementById('attempts').textContent = `Attempts: ${attempts}`;
        const boxes = document.querySelectorAll('.box i');
        boxes.forEach((box, index) => {
            const parentBox = box.parentElement;
            parentBox.classList.add('spinning');
            setTimeout(() => {
                const randomIcon = icons[level][Math.floor(Math.random() * icons[level].length)];
                box.className = `fas ${randomIcon}`;
                parentBox.classList.remove('spinning');
            }, index * 500); // Delay each box spin by 500ms
        });
        setTimeout(() => {
            checkWin(boxes);
        }, boxes.length * 500); // Check win after all boxes have spun
    } else {
        // Create a Bootstrap-styled alert for no attempts left with a frown icon
        const noAttemptsAlert = document.createElement('div');
        noAttemptsAlert.className = 'alert alert-danger animate-alert custom-alert';
        noAttemptsAlert.innerHTML = '<strong><i class="fas fa-frown"></i> :(</strong> No more attempts left. Watch an ad or buy more attempts.';
        document.getElementById('game-container').prepend(noAttemptsAlert);
        setTimeout(() => {
            noAttemptsAlert.classList.add('fade-out');
            setTimeout(() => noAttemptsAlert.remove(), 1000);
        }, 3000);
    }
}

function checkWin(boxes) {
    const firstIcon = boxes[0].className;
    const isWin = Array.from(boxes).every(box => box.className === firstIcon);
    if (isWin) {
        // Create a Bootstrap-styled win alert with a dollar icon
        const winAlert = document.createElement('div');
        winAlert.className = 'alert alert-success animate-alert custom-alert';
        winAlert.innerHTML = '<strong><i class="fas fa-dollar-sign"></i> Congratulations!</strong> You won!';
        document.getElementById('game-container').prepend(winAlert);
        setTimeout(() => {
            winAlert.classList.add('fade-out');
            setTimeout(() => winAlert.remove(), 1000);
        }, 3000);
        
        points += level * 10; // Increase points based on level
        localStorage.setItem('points', points);
        document.getElementById('points').textContent = `Points: ${points}`;
        boxes.forEach(box => box.parentElement.classList.add('win-animation'));
        setTimeout(() => {
            boxes.forEach(box => box.parentElement.classList.remove('win-animation'));
        }, 3000);
    }
}
