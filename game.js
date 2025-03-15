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

document.addEventListener('DOMContentLoaded', () => {
    // Existing game logic event listeners
    document.getElementById('spin-button').addEventListener('click', spinBoxes);
    document.getElementById('level-select').addEventListener('change', (event) => {
        level = parseInt(event.target.value);
        attempts = 8 * level; // Adjust attempts based on level
        localStorage.setItem('attempts', attempts);
        document.getElementById('attempts').textContent = `Attempts: ${attempts}`;
    });
    // Bind wallet and settings buttons after DOM is ready
    document.getElementById('wallet-button-title').addEventListener('click', showWalletPage);
    document.getElementById('settings-button').addEventListener('click', showSettingsPage);

    // Bind bottom navbar event listeners for page switching
    document.getElementById('nav-home').addEventListener('click', showHomePage);
    document.getElementById('nav-earn').addEventListener('click', showEarnPage);
    document.getElementById('nav-mempad').addEventListener('click', showMempadPage);
    document.getElementById('nav-frens').addEventListener('click', showFrensPage);
    document.getElementById('nav-wallet').addEventListener('click', showWalletPage);
});

// Stub functions for navbar switching
function showHomePage() {
    // Reloads the home page (game interface)
    location.reload();
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
        // Only display a new alert if one is not already shown.
        const existingAlert = document.querySelector('.no-attempts-alert');
        if (!existingAlert) {
            const noAttemptsAlert = document.createElement('div');
            noAttemptsAlert.className = 'alert alert-danger animate-alert custom-alert no-attempts-alert';
            noAttemptsAlert.innerHTML = '<strong><i class="fas fa-frown"></i> :(</strong> No more attempts left. Watch an ad or buy more attempts.';
            document.getElementById('game-container').prepend(noAttemptsAlert);
            setTimeout(() => {
                noAttemptsAlert.classList.add('fade-out');
                setTimeout(() => noAttemptsAlert.remove(), 1000);
            }, 3000);
        } else {
            // Re-display the existing alert if it exists (remove fade-out if needed).
            existingAlert.classList.remove('fade-out');
        }
    }
}

function checkWin(boxes) {
    const firstIcon = boxes[0].className;
    const isWin = Array.from(boxes).every(box => box.className === firstIcon);
    if (isWin) {
        // Create a Bootstrap-styled win alert with a dollar icon and new palette styling
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
