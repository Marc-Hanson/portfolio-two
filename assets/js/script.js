// Array for element names and default innerHTML.
const options = ["fire", "grass", "rock", "ice", "ground"];

//Adds Event Listeners to the 5 buttons to allow the player to take first turn.
document.addEventListener("DOMContentLoaded", addListeners());

//Updates player choice and runs computers turn.
async function yourTurn() {
    removeListeners();
    let yourChoice = this.getAttribute("id");
    let yourElement = document.getElementById(yourChoice).textContent;
    document.getElementById('your-choice').innerHTML = yourElement;
    await new Promise(resolve => setTimeout(resolve, 500));
    jerryTurn();
}

//Updates computer choice from options array and random number, Runs the result checking.
async function jerryTurn() {
    let jerryChoice = options[Math.floor(Math.random() * options.length)];
    let jerryElement = document.getElementById(jerryChoice).textContent;
    document.getElementById('jerry-choice').innerHTML = jerryElement;
    await new Promise(resolve => setTimeout(resolve, 500));
    resultsCheck();
}

//Compares your choice to the computer choice and runs appropriate function.
async function resultsCheck() {
    let yourMove = document.getElementById('your-choice').textContent;
    let jerryMove = document.getElementById('jerry-choice').textContent;
    if (yourMove == jerryMove) {
        aDraw();
    } else if (
        (yourMove == "🔥" && jerryMove == "🌱") ||
        (yourMove == "🔥" && jerryMove == "❄️") ||
        (yourMove == "🌱" && jerryMove == "🪨") ||
        (yourMove == "🌱" && jerryMove == "🌰") ||
        (yourMove == "🪨" && jerryMove == "❄️") ||
        (yourMove == "🪨" && jerryMove == "🔥") ||
        (yourMove == "❄️" && jerryMove == "🌰") ||
        (yourMove == "❄️" && jerryMove == "🌱") ||
        (yourMove == "🌰" && jerryMove == "🔥") ||
        (yourMove == "🌰" && jerryMove == "🪨")
    ) {
        youWin();
    } else {
        youLose();
    }
}

//Displays win/lose/draw emojis and increments scores.
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
    if (document.getElementById('your-score').textContent == 9) {
        document.getElementById('theWinner').innerHTML = 'You win';
        document.getElementById('game-over').style.display = 'block';
        removeListeners();
    } else {
        document.getElementById('your-score').innerHTML++;
    }
    await new Promise(resolve => setTimeout(resolve, 400));
    addListeners();
}

async function youLose() {
    await new Promise(resolve => setTimeout(resolve, 400));
    document.getElementById('your-choice').innerHTML = "👎";
    document.getElementById('jerry-choice').innerHTML = "👍";
    if (document.getElementById('jerry-score').textContent == 9) {
        document.getElementById('theWinner').innerHTML = 'Jerry wins';
        document.getElementById('game-over').style.display = 'block';
        removeListeners();
    } else {
        document.getElementById('jerry-score').innerHTML++;
    }
    await new Promise(resolve => setTimeout(resolve, 400));
    addListeners();
}

//Sets cooldown on buttons to stop user clicking too often.
function removeListeners() {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.removeEventListener("click", yourTurn);
    }
}

function addListeners() {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", yourTurn);
    }
}
