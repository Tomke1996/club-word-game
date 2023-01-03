// Toggle Hint Button
const hintBtn = document.querySelector('.hintBtn');
const hintText = document.getElementById('hintText');

hintBtn.onclick = () => { hintText.classList.toggle('active'); }

// Main JS
const wrongWords = document.querySelector('.wrong-words span');
const guessLeft = document.querySelector('.guess-left');
const resetBtn = document.querySelector('.reset');
const inputs = document.querySelector('.inputs');
const wordInput = document.querySelector('.wordInput');

let words = [];
let maxGuesses = [];
let incorrectWords = [];
let correctWords = [];

// Get and Show Random Word from club.js
function randomWords() {
    let randomWord = premierLeague[Math.floor(Math.random() * premierLeague.length)];
    words = randomWord.club;
    // console.log(words);
    correctWords = [];
    incorrectWords = [];
    if (words.length >= 8) {
        maxGuesses = 7;
        guessLeft.innerHTML = `Guesses remaining: ` + `<i class='fas fa-futbol'></i>`.repeat(maxGuesses);
    } else {
        maxGuesses = 5;
        guessLeft.innerHTML = `Guesses remaining: ` + `<i class='fas fa-futbol'></i>`.repeat(maxGuesses);
    }
    hintText.textContent = randomWord.hint;
    wrongWords.textContent = incorrectWords;

    let html = '';      
    for (let i = 0; i < words.length; i++) {
        const currentWord = words[i];
        // console.log(currentWord);  
        if (currentWord === '-') {
          const space = document.querySelectorAll('.input')[i];
          html += `<input class="input" type="text" value="-" disabled>`;
          correctWords.push('-');
        } else {
            html += `<input class="input" type="text" disabled>`;
          }
      }
      inputs.innerHTML = html;     
}

// On Load
randomWords();

function initGame(e) {
    if (e.key === 'Enter') {
        let keyLetter = e.target.value.toLowerCase();
        // console.log(keyLetter);
        if(keyLetter.match(/^[A-Za-z]+$/) && !incorrectWords.includes(` ${keyLetter}`) && !correctWords.includes(keyLetter)) {
            if (words.includes(keyLetter)) {
                for(let i = 0; i < words.length; i++) {
                    if (words[i] == keyLetter) {
                        correctWords += keyLetter;
                        console.log("Correct: " + correctWords);
                        inputs.querySelectorAll(".input")[i].value = keyLetter;
                    }
                }
            } else {
                maxGuesses--;
                incorrectWords.push(`${keyLetter}`);
                console.log("Wrong: " + incorrectWords);
            }
            wrongWords.textContent = incorrectWords;
            guessLeft.innerHTML = `Guess remaining: ` + `<i class='fas fa-futbol'></i>`.repeat(maxGuesses);
        } 
        wordInput.value = "";

        // Results
        setTimeout(() => {
            if(correctWords.length === words.length) {
                alert('Congrats!');
                return randomWords();
            } else if(maxGuesses < 1) {
                alert("Game over! You don't have remaining guesses");
                for(let i = 0; i < words.length; i++) {
                    inputs.querySelectorAll(".input")[i].value = words[i];
                }
            }
        }, 100);
    }
}

// Add Event Listeners
// wordInput.addEventListener('input', initGame);
wordInput.addEventListener('keydown', initGame);
resetBtn.addEventListener('click', randomWords);