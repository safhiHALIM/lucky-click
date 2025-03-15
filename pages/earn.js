function showEarnPage() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = `
      <!-- Earn Page (stub) -->
      <div class="text-center">
         <h2>Earn Page</h2>
         <p>Coming soon...</p>
         <button id="back-btn-earn" class="btn"><i class="fas fa-arrow-left"></i></button>
      </div>
    `;
    document.getElementById('back-btn-earn').addEventListener('click', showHomePage);
}
