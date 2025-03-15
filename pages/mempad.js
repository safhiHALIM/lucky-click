function showMempadPage() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = `
      <!-- Mempad Page (stub) -->
      <div class="text-center">
         <h2>Mempad Page</h2>
         <p>Coming soon...</p>
         <button id="back-btn-mempad" class="btn"><i class="fas fa-arrow-left"></i></button>
      </div>
    `;
    document.getElementById('back-btn-mempad').addEventListener('click', showHomePage);
}
