function showSettingsPage() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = `
        <!-- Settings Page -->
        <div class="container settings-container">
            <div class="row mb-3">
                <div class="col text-center">
                    <h2>Settings</h2>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-6">
                    <div class="form-check">
                        <input class="form-check-input palette-checkbox" type="checkbox" id="checkbox1">
                        <label class="form-check-label" for="checkbox1">Option 1</label>
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-check">
                        <input class="form-check-input palette-checkbox" type="checkbox" id="checkbox2">
                        <label class="form-check-label" for="checkbox2">Option 2</label>
                    </div>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-6">
                    <div class="form-check">
                        <input class="form-check-input palette-checkbox" type="checkbox" id="checkbox3">
                        <label class="form-check-label" for="checkbox3">Option 3</label>
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-check">
                        <input class="form-check-input palette-checkbox" type="checkbox" id="checkbox4">
                        <label class="form-check-label" for="checkbox4">Option 4</label>
                    </div>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-6">
                    <div class="form-check">
                        <input class="form-check-input palette-radio" type="radio" name="settingsRadio" id="radio1" value="option1">
                        <label class="form-check-label" for="radio1">Radio Option 1</label>
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-check">
                        <input class="form-check-input palette-radio" type="radio" name="settingsRadio" id="radio2" value="option2">
                        <label class="form-check-label" for="radio2">Radio Option 2</label>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col text-center">
                    <button id="back-button-settings" class="btn back-btn"><i class="fas fa-arrow-left"></i></button>
                </div>
            </div>
        </div>
    `;
    document.getElementById('back-button-settings').addEventListener('click', () => {
        location.reload();
    });
    
    // Apply palette styling when checkboxes or radios are clicked
    document.querySelectorAll('.palette-checkbox').forEach(chk => {
        chk.addEventListener('change', function() {
            this.parentElement.style.backgroundColor = this.checked ? "#F4A261" : "transparent";
        });
    });
    
    document.querySelectorAll('.palette-radio').forEach(radio => {
        radio.addEventListener('change', function() {
            document.querySelectorAll('.palette-radio').forEach(r => {
                r.parentElement.style.backgroundColor = "transparent";
            });
            if (this.checked) {
                this.parentElement.style.backgroundColor = "#2A9D8F";
            }
        });
    });
}
