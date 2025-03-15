function showFrensPage() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = `
      <!-- Frens Page (stub) -->
      <div class="text-center">
         <h2>Frens Page</h2>
         <p>Coming soon...</p>
         <button id="back-btn-frens" class="btn"><i class="fas fa-arrow-left"></i></button>
      </div>
    `;
    document.getElementById('back-btn-frens').addEventListener('click', showHomePage);
}
