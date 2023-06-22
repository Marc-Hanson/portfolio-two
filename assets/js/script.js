const options = ["fire", "grass", "rock", "ice", "ground"];
const defaultHtml = document.getElementById('your-choice').textContent;

//Generate a random number between 0 and 4 for computers turn and uses it to select a value from the 'options' array.
function getJerryChoice(){
    let jerryMath = options[Math.floor(Math.random() * options.length)];
    let jerryChoice = document.getElementById(jerryMath).textContent;
    document.getElementById('jerry-choice').innerHTML = jerryChoice;
}

//Returns player and computer choice to ? emoji after the game.
function returnToDefault(){
    document.getElementById('your-choice').innerHTML = defaultHtml;
    document.getElementById('jerry-choice').innerHTML = defaultHtml;
}
getJerryChoice();