// const
// naamveld
const nameInput = document.getElementById("nameInput");
const buttonNaam = document.getElementById("buttonNaam");
const uitlegElement = document.getElementById("naamInUitleg");

// knoppen om progressbar te beinvloeden
const koekjeKnop = document.getElementById("koekje");           // https://pngtree.com/freepng/yellow-cookie-illustration_4541138.html
const catapultKnop = document.getElementById("catapult");       // https://pngtree.com/free-png-vectors/catapult
const kanonKnop = document.getElementById("kanon");             // https://nl.vecteezy.com/png/9385524-ancien-cannon-clipart-design-illustratie
const emmerWater = document.getElementById("emmerWater");       // https://vectorportal.com/vector/bucket-of-water-vector-clip-art/26599
const startKnop = document.getElementById("startKnop");         // https://www.flaticon.com/free-icon/start-button_5360348

// status aangeven van spel starten en game over
const pElement = document.getElementById("pElement");

// progressbar monster
const progressBar = document.getElementById("leeg");
const progressBarImages = [
    "images/pb0.png",
    "images/pb1.png",
    "images/pb2.png",
    "images/pb3.png",
    "images/pb4.png",
    "images/pb5.png",
    "images/pb6.png",
    "images/pb7.png",
    "images/pb8.png",
    "images/pb9.png",
    "images/pb10.png",
    "images/pb11.png",
    "images/pb12.png"
]

// audio's
const kanonAudio = new Audio("sounds/kanonAudio.mp3");          // https://www.youtube.com/watch?v=4hVuKDWl-54&ab_channel=EthanTheKing
const gameOverAudio = new Audio("sounds/gameOver.mp3");         // https://pixabay.com/sound-effects/negative-beeps-6008/
const gewonnenAudio = new Audio("sounds/yay.mp3");              // https://pixabay.com/sound-effects/yay-6120/

// let
// naamveld
let userName;

// om game te kunnen beginnen
let gameBegonnen = false;
let nameIngevuld = false;

// progress bar monster
let monsterHealth = 7; // monsterhealth begint bij 7 wanneer spel start

// functies
// de ingevulde naam wordt toegepast
function naamIngevuld(){
    userName = nameInput.value;
    uitlegElement.textContent = userName;
    pElement.textContent = "Succes, " + userName + "!"
    nameIngevuld = true;
}

// start game wanneer naam is ingevuld
function startGame(){
    if(nameIngevuld == false){
        pElement.textContent = "Vul je naam in voordat je het spel begint!";
    } else {
        gameBegonnen = true; 

        monsterHealth = 7;

        updateMonsterProgressBar();
    }
}

// zorgt ervoor dat de healt niet lager dan 0 en hoger dan 12 kan
function monsterHealthGrens(){
    if(monsterHealth > 12){
        monsterHealth = 12;
    } else if(monsterHealth < 0){
        monsterHealth = 0;
    }
}

// hiermee zorg je ervoor dat de progressbar omhoog gaat tot 12
function verhoogProgressBarMonster(){
    if(gameBegonnen == true){
        monsterHealth++;
        monsterHealthGrens();

        if(monsterHealth == 12){
            pElement.textContent = "Game over...";
            gameBegonnen = false;
            gameOverAudio.play();
        }

        updateMonsterProgressBar();
    }
}

// 
function verlaagProgressBarMonster(){
    if(gameBegonnen == true){
        monsterHealth--;
        monsterHealthGrens();

        if(monsterHealth == 0){
            pElement.textContent = "Je hebt gewonnen " + userName + "!";
            gameBegonnen = false;
            gewonnenAudio.play();
        }

        updateMonsterProgressBar();
    }
}

// audio wordt afgespeeld en de health gaat met 2 omlaag
function kanonSchot(){
    kanonAudio.play();
    verlaagProgressBarMonster();
    verlaagProgressBarMonster(); // staat er 2 keer in zodat de health bij kanon met 2 eraf gaat
}

// zorgt ervoor dat de progressbar plaatjes veranderen met het getal
function updateMonsterProgressBar(){
    progressBar.src = progressBarImages[monsterHealth];
}

// knoppen
buttonNaam.addEventListener('click', naamIngevuld);

startKnop.addEventListener('click', startGame);

// knoppen zorgen ervoor dat de progressbar monster werkt
koekjeKnop.addEventListener('click', verhoogProgressBarMonster);

catapultKnop.addEventListener('click', verlaagProgressBarMonster);

kanonKnop.addEventListener('click', kanonSchot);

// verhoogt health van monster elke 2 seconden
setInterval(verhoogProgressBarMonster, 2000);