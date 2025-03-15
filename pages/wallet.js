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
    // When the back button is clicked, reload the page.
    document.getElementById('back-button').addEventListener('click', () => {
        location.reload();
    });
}
