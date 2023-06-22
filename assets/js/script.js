// Array for element names and default innerHTML.
const options = ["fire", "grass", "rock", "ice", "ground"];
const defaultHtml = document.getElementById('your-choice').textContent;

//Adds Event Listeners to the 5 buttons to allow the player to take first turn.
document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", yourTurn);
    }
});

//Player selects and element then has a half second pause before computers turn.
async function yourTurn() {
    let yourChoice = this.getAttribute("id");
    let yourElement = document.getElementById(yourChoice).textContent;
    document.getElementById('your-choice').innerHTML = yourElement;
    await new Promise(resolve => setTimeout(resolve, 400));
    jerryTurn();
}

//Generate a random number between 0 and 4 for computers turn and uses it to select a value from the 'options' array.
//Computer selects and element then has a half second pause before checking for winner.
async function jerryTurn() {
    let jerryChoice = options[Math.floor(Math.random() * options.length)];
    let jerryElement = document.getElementById(jerryChoice).textContent;
    document.getElementById('jerry-choice').innerHTML = jerryElement;
    await new Promise(resolve => setTimeout(resolve, 400));
    resultsCheck();
}

//Compares your choice to the computer choice and displays results.
function resultsCheck() {
    let yourMove = document.getElementById('your-choice').textContent;
    let jerryMove = document.getElementById('jerry-choice').textContent;
    if (yourMove == jerryMove) {
        alert("It's a draw.");
        document.getElementById('your-choice').innerHTML = defaultHtml;
        document.getElementById('jerry-choice').innerHTML = defaultHtml;
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
        alert("You WON!");
        document.getElementById('your-choice').innerHTML = defaultHtml;
        document.getElementById('jerry-choice').innerHTML = defaultHtml;
    } else {
        alert("You LOSE!");
        document.getElementById('your-choice').innerHTML = defaultHtml;
        document.getElementById('jerry-choice').innerHTML = defaultHtml;
    }
}