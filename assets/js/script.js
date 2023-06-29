// Array for element names.
const options = ["fire", "grass", "rock", "ice", "ground"];

// Select game mode. Removes HTML for 2 elements, also removes them from array.
function threeElements() {
    document.getElementById('game-start').style.display = 'none';
    document.getElementById('content-wrapper').style.display = 'inline';
    document.getElementById('fire').style.display = 'none';
    document.getElementById('ground').style.display = 'none';
    options.splice(4, 4);
    options.splice(0, 1);
    document.getElementById('instructions').innerHTML = `🌿 covers 🪨,
            🪨 smashes ❄️, and ❄️ freezes 🌿.`;
    addListeners();
}

function fiveElements() {
    document.getElementById('game-start').style.display = 'none';
    document.getElementById('content-wrapper').style.display = 'inline';
    addListeners();
}

// Inserts player choice and runs computers turn.
async function yourTurn() {
    removeListeners();
    let yourChoice = this.getAttribute("id");
    let yourElement = document.getElementById(yourChoice).textContent;
    document.getElementById('your-choice').innerHTML = yourElement;
    await new Promise(resolve => setTimeout(resolve, 500));
    jerryTurn();
}

// Updates computer choice from options array and random number, Runs the result checking.
async function jerryTurn() {
    let jerryChoice = options[Math.floor(Math.random() * options.length)];
    let jerryElement = document.getElementById(jerryChoice).textContent;
    document.getElementById('jerry-choice').innerHTML = jerryElement;
    await new Promise(resolve => setTimeout(resolve, 500));
    resultsCheck();
}

// Compares your choice to the computer choice and runs appropriate function.
async function resultsCheck() {
    let yourMove = document.getElementById('your-choice').textContent;
    let jerryMove = document.getElementById('jerry-choice').textContent;
    if (yourMove == jerryMove) {
        aDraw();
    } else if (
        (yourMove == "🔥" && jerryMove == "🌿") ||
        (yourMove == "🔥" && jerryMove == "❄️") ||
        (yourMove == "🌿" && jerryMove == "🪨") ||
        (yourMove == "🌿" && jerryMove == "🍄") ||
        (yourMove == "🪨" && jerryMove == "❄️") ||
        (yourMove == "🪨" && jerryMove == "🔥") ||
        (yourMove == "❄️" && jerryMove == "🍄") ||
        (yourMove == "❄️" && jerryMove == "🌿") ||
        (yourMove == "🍄" && jerryMove == "🔥") ||
        (yourMove == "🍄" && jerryMove == "🪨")
    ) {
        youWin();
    } else {
        youLose();
    }
}

// Displays win/lose/draw emojis and increments scores.
async function aDraw() {
    await new Promise(resolve => setTimeout(resolve, 400));
    document.getElementById('your-choice').innerHTML = "✊";
    document.getElementById('jerry-choice').innerHTML = "✊";
    await new Promise(resolve => setTimeout(resolve, 400));
    addListeners();
}

async function youWin() {
    await new Promise(resolve => setTimeout(resolve, 400));
    document.getElementById('your-choice').innerHTML = "👍";
    document.getElementById('jerry-choice').innerHTML = "👎";
    if (document.getElementById('your-score').textContent == 4) {
        removeListeners();
        document.getElementById('theWinner').innerHTML = 'You win';
        document.getElementById('game-over').style.display = 'inline';
    } else {
        document.getElementById('your-score').innerHTML++;
        addListeners();
    }
    await new Promise(resolve => setTimeout(resolve, 400));
}

async function youLose() {
    await new Promise(resolve => setTimeout(resolve, 400));
    document.getElementById('your-choice').innerHTML = "👎";
    document.getElementById('jerry-choice').innerHTML = "👍";
    if (document.getElementById('jerry-score').textContent == 4) {
        removeListeners();
        document.getElementById('theWinner').innerHTML = 'Jerry wins';
        document.getElementById('game-over').style.display = 'inline';
    } else {
        document.getElementById('jerry-score').innerHTML++;
        addListeners();
    }
    await new Promise(resolve => setTimeout(resolve, 400));
}

// Used to set cooldown on buttons to stop user clicking too often.
function removeListeners() {
    let buttons = document.getElementsByClassName("element-choice");

    for (let button of buttons) {
        button.removeEventListener("click", yourTurn);
    }
}

function addListeners() {
    let buttons = document.getElementsByClassName("element-choice");

    for (let button of buttons) {
        button.addEventListener("click", yourTurn);
    }
}