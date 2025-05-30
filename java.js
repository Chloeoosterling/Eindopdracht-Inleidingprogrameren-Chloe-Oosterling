

const startscherm = document.querySelector(".begin");
const button = document.querySelector("#startBtn");

const tafel = document.querySelector(".tafel");

const lichtuit = document.querySelector(".lichtuit");

const zoekobject = document.querySelector(".zoekobject");

const storyline = document.querySelector(".storyline");
const knop = document.querySelector("#beginBtn");

const volgendlevel = document.querySelector(".volgendlevel");
const antwoord = document.getElementById("antwoordInput");
const feedback = document.getElementById("feedback");
const controleer = document.getElementById("controleerBtn");

// Lois had me alten zien hoe zei de audio in haar code had gezet
const levelGehaald = new Audio("audio/awesome-level-up-351714.mp3");
const openingGeluid = new Audio("audio/Openingvanspel.mp3");
const algemeenGeluid = new Audio("audio/spanning.mp3");

const totaalObjecten = 9;
const tellerElement = document.getElementById("teller");
const controleerBtn2 = document.getElementById("controleerBtn2")
const antwoord2 = document.getElementById("antwoordInput2");
const volgendeRondeBtn = document.getElementById("volgendeRondeBtn")

const tafel2 = document.querySelector(".tafel2");

const lichtuit2 = document.querySelector(".lichtuit2");

const zoekobject2 = document.querySelector(".zoekobject2");
const feedback2 = document.getElementById("feedback2")
const tellerElement2 = document.getElementById("teller")

const homeBtn = document.getElementById("home")

const einde = document.querySelector(".einde");
const eindeBericht = document.getElementById("eindeBericht");

let gevondenObjecten = 0;

let gevondenObjecten2 = [];

let countdown;


function showOnlySection(sectionToShow) {
    const allSections = document.querySelectorAll(".begin, .storyline, .tafel, .lichtuit, .zoekobject, .volgendlevel, .tafel2, .lichtuit2, .zoekobject2, .einde"
    );
    allSections.forEach(section => {
        section.classList.add("hidden");
    });
    sectionToShow.classList.remove("hidden");
}

button.addEventListener("click", function () {
    openingGeluid.play();
    algemeenGeluid.play();
    algemeenGeluid.loop = true;
    showOnlySection(storyline);
})

knop.addEventListener("click", function () {
    showOnlySection(tafel);

    if (countdown) {
        clearInterval(countdown);
    }

    // zorgt voor de timer bij hoeveel seconden je hebt om naar de tafel te kijken
    let tijd = 10;
    const timerEl1 = document.getElementById("timer1");
    timerEl1.textContent = `Volgende pagina in ${tijd} seconden...`;

    countdown = setInterval(() => {
        tijd--;
        timerEl1.textContent = `Volgende pagina in ${tijd} seconden...`;

        if (tijd <= 0) {
            clearInterval(countdown);
            showOnlySection(lichtuit);

            setTimeout(() => {
                showOnlySection(zoekobject);
            }, 3000);
        }
    }, 1000);
});

// Functie die het antwoord controleert
function checkAntwoord() {
    const antwoordIngevuld = antwoord.value.trim().toLowerCase();
    const correcteAntwoorden = ["gouden armband", "gouden ketting", "armband"];

    if (correcteAntwoorden.includes(antwoordIngevuld)) {
        feedback.textContent = "Goed gedaan!";
        algemeenGeluid.pause();
        levelGehaald.play();
        showOnlySection(volgendlevel);
    } else {
        feedback.textContent = "Oei, dat is niet goed. Probeer het nog een keer!";
    }
}

//----------------------------------------------------------
//chatgpt prompt: ik wil graag het volgende level hieraan toevoegen met dat je dus meerdere goede antwoorden in moet vullen om naar het volgende level te gaan 9 om precies te zijn 


function checkAntwoord2() {
    const antwoordIngevuld2 = antwoord2.value.trim().toLowerCase();
    const correcteAntwoorden2 = ["parelketting", "gouden ring", "diamanten ring", "ring", "ring1", "ring2", "ring3", "ring4", "diamant"];

    if (correcteAntwoorden2.includes(antwoordIngevuld2)) {
        if (!gevondenObjecten2.includes(antwoordIngevuld2)) {
            gevondenObjecten2.push(antwoordIngevuld2);
            feedback2.textContent = `Goed gedaan! Je hebt "${antwoordIngevuld2}" gevonden.`;
        } else {
            feedback2.textContent = "Dit voorwerp heb je al gevonden!";
        }
    } else {
        feedback2.textContent = "Dat voorwerp zit er niet bij, probeer opnieuw!";
    }

    updateTeller2();
    antwoord2.value = "";
}

function updateTeller2() {
    tellerElement2.textContent = `Gevonden: ${gevondenObjecten2.length}/9`;

    if (gevondenObjecten2.length === 9) {
        levelGehaald.play();
        algemeenGeluid.pause();
        eindeBericht.textContent = "Super goed gedaan, je hebt alle voorwerpen weer terug gevonden!";
        showOnlySection(einde);
    }
}

controleerBtn2.addEventListener("click", checkAntwoord2);
antwoord2.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        checkAntwoord2();
    }
});

// chatgpt prompt: "hoe kan ik ervoor zorgen dat naast dat je op control moet klikken ook op enter kan drukken"

// Eventlistener voor klikken op de controleer-knop
controleer.addEventListener("click", checkAntwoord);

// Eventlistener voor indrukken van Enter op toetsenbord
antwoord.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        checkAntwoord();
    }
});

volgendeRondeBtn.addEventListener("click", function () {
    showOnlySection(tafel2);
    algemeenGeluid.play();
    algemeenGeluid.loop = true;


    let tijd2 = 10;
    const timerEl2 = document.getElementById("timer2");
    timerEl2.textContent = `Volgende pagina in ${tijd2} seconden...`;

    countdown = setInterval(() => {
        tijd2--;
        timerEl2.textContent = `Volgende pagina in ${tijd2} seconden...`;

        if (tijd2 <= 0) {
            clearInterval(countdown);
            showOnlySection(lichtuit2);

            setTimeout(() => {
                showOnlySection(zoekobject2);
            }, 3000);
        }
    }, 1000);
});

homeBtn.addEventListener("click", function () {
    showOnlySection(startscherm)

    gevondenObjecten2 = [];
    tellerElement2.textContent = "Gevonden: 0/9";
    antwoord2.value = "";
    algemeenGeluid.pause();
})

// bronnen voor audio: https://pixabay.com/sound-effects/search/suspense/?order=ec