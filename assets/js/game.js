// Generates a random 4 digit combo, where each digit is unique
export function randomCombo() {
    // Avail digits to choose
    let set = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
    let randCombo = [];
    // While combo is not yet 4, continue adding digits
    while (randCombo.length <= 3) {
        let randPos = Math.floor(Math.random() * set.size);
        let randDigit = Array.from(set)[randPos];
        randCombo.push(randDigit);
        set.delete(randDigit);
    }
    return randCombo;
}

// Checks whether the user's guess is valid
export function isItValid(num) {
    let randCombo = String.prototype.concat(...new Set(num));
    // Checks length of input
    if (num.length !== 4) {
        alert("Guess must be exactly 4 digits!");
        return false;
    }
    // Checks whether input has unique digits
    else if (randCombo.length !== num.length) {
        alert("Guess must have unique digits!");
        return false;
    }
    return true;
}

// Checks whether the player has won or lost
export function gameCondition(guesses, a, randStr) {
    // If 8 guesses have already been made, player loses
    if (guesses.length === 8) {
        alert("You Lost!");
        document.getElementById("guess").disabled = true;
    }
    // If correct guess is made, player wins
    if (a === 4) {
        alert("You win!");
        document.getElementById("guess").disabled = true;
    }
}

  // Restarts the game
  export function restart() {
    window.location.reload();
  }