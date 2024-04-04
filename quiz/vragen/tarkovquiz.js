const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const resultDiv = document.getElementById("result");

let shuffledQuestions, currentQuestionIndex, score;

const questions = [
    {
        question: "Wat is de voornaamste reden voor het verkennen van verschillende gebieden in Escape from Tarkov?",
        answers: [
            { text: "Sightseeing", correct: false },
            { text: "Het vinden van verborgen schatten", correct: false },
            { text: "Het ontdekken van nieuwe handelsroutes", correct: false },
            { text: "Verzamelen van waardevolle items en informatie", correct: true }
        ]
    },
    {
        question: "Welk aspect van de gameplay van Escape from Tarkov zorgt voor een realistische en uitdagende ervaring?",
        answers: [
            { text: "Onsterfelijkheid", correct: false },
            { text: "Eindeloze munitie", correct: false },
            { text: "Hardcore survivalmechanica", correct: true },
            { text: "Superkrachten", correct: false }
        ]
    },
    {
        question: "Welke van de volgende is een van de mogelijke kaarten of locaties in Escape from Tarkov?",
        answers: [
            { text: "Snowy Peak", correct: false },
            { text: "Interstellar Space", correct: false },
            { text: "Customs", correct: true },
            { text: "Tilted towers", correct: false }
        ]
    },
    {
        question: "Welke van de volgende zijn AI-gecontroleerde vijanden in Escape from Tarkov?",
        answers: [
            { text: "Zombies", correct: false },
            { text: "Robots", correct: false },
            { text: "Scavs", correct: true },
            { text: "Weerwolven", correct: false }
        ]
    },
    {
        question: "Welke van de volgende is een van de wapencategorieën in Escape from Tarkov?",
        answers: [
            { text: "Fabelachtige wapens", correct: false },
            { text: "Dierlijke wapens", correct: false },
            { text: "Mechanische wapens", correct: true },
            { text: "Technologische wapens", correct: false }
        ]
    },
    {
        question: "Wat is de belangrijkste modus van Escape from Tarkov?",
        answers: [
            { text: "Singleplayer", correct: false },
            { text: "Co-op", correct: false },
            { text: "Online multiplayer", correct: true },
            { text: "Versus", correct: false }
        ]
    },
    {
        question: "Welke van de volgende is een van de mogelijke einddoelen voor spelers in Escape from Tarkov?",
        answers: [
            { text: "Verovering van de hele map", correct: false },
            { text: "Uiteindelijke ontsnapping uit Tarkov", correct: true },
            { text: "Opbouw van een eigen factie", correct: false },
            { text: "Versla de eindbaas van het spel", correct: false }
        ]
    },
    {
        question: "Welk type uitrusting is essentieel voor het verminderen van schade en het beschermen van spelers in Escape from Tarkov?",
        answers: [
            { text: "Magische schilden", correct: false },
            { text: "Pantser en helmen", correct: true },
            { text: "Krachtvelden", correct: false },
            { text: "Reflecterende amuletten", correct: false }
        ]
    },
    {
        question: "Welke rol speelt het weer in Escape from Tarkov?",
        answers: [
            { text: "Invloed op de zichtbaarheid en het gehoor van spelers", correct: true },
            { text: "Geen invloed", correct: false },
            { text: "Purely aesthetics", correct: false },
            { text: "Bepaalt de snelheid van vijandelijke aanvallen", correct: false }
        ]
    },
    {
        question: "Welk aspect van Escape from Tarkov draagt bij aan de permadeath-ervaring?",
        answers: [
            { text: "De mogelijkheid om personagevaardigheden te behouden na de dood.", correct: false },
            { text: "Het verlies van alle uitrusting en inventaris bij de dood.", correct: true },
            { text: "De kans om weer tot leven te komen na een korte periode.", correct: false },
            { text: "Het behoud van basisvoorwerpen na de dood.", correct: false }
        ]
    },
    {
        question: "Wat is het belangrijkste verschil tussen PMC's (Private Military Company) en Scavs in Escape from Tarkov?",
        answers: [
            { text: "PMC's hebben toegang tot betere uitrusting en wapens.", correct: true },
            { text: "Scavs kunnen sneller rennen dan PMC's.", correct: false },
            { text: "PMC's hebben onbeperkte levens terwijl Scavs een beperkt aantal levens hebben.", correct: false },
            { text: "Scavs hebben betere gezondheid dan PMC's.", correct: false }
        ]
    },
    {
        question: "Welke kaart biedt een stedelijke omgeving in Escape from Tarkov?",
        answers: [
            { text: "Woods.", correct: false },
            { text: "Interchange.", correct: true },
            { text: "Shoreline.", correct: false },
            { text: "Reserve.", correct: false }
        ]
    },
    {
        question: "Wat zijn 'hot zones' in Escape from Tarkov?",
        answers: [
            { text: "Gebieden met verhoogde vijandelijke activiteit", correct: false },
            { text: "Locaties met waardevolle loot", correct: true },
            { text: "Plaatsen waar spelers kunnen uitrusten en genezen", correct: false },
            { text: "Speciale arena's voor PvP-gevechten", correct: false }
        ]
    },
    {
        question: "Wat is de belangrijkste beperking waarmee spelers in Escape from Tarkov worden geconfronteerd?",
        answers: [
            { text: "Beperkte toegang tot wapens en uitrusting", correct: false },
            { text: "Tijdslimiet voor het voltooien van missies", correct: true },
            { text: "Energie- en gezondheidslimiet van het personage", correct: false },
            { text: "Beperkte bewegingsvrijheid binnen de spelwereld", correct: false }
        ]
    },
    {
        question: "Wat is een van de belangrijkste redenen waarom spelers in Escape from Tarkov kiezen voor het spelen als Scav?",
        answers: [
            { text: "Scavs hebben toegang tot krachtigere wapens.", correct: false },
            { text: "Spelers kunnen Scavs gebruiken om de markt te manipuleren.", correct: false },
            { text: "Spelers kunnen de uitrusting van gevallen PMC's verzamelen.", correct: true },
            { text: "Scavs hebben onbeperkte levens en verliezen geen uitrusting bij de dood", correct: false }
        ]
    }
];

startQuiz();

function startQuiz() {
    score = 0;
    questionContainer.style.display = "flex";
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    nextButton.classList.remove("hide");
    restartButton.classList.add("hide");
    resultDiv.classList.add("hide");
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = `Vraag ${currentQuestionIndex + 1}: ${question.question}`;
    question.answers.forEach((answer, index) => {
        const inputGroup = document.createElement("div");
        inputGroup.classList.add("input-group");

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.id = "answer" + index;
        radio.name = "answer";
        radio.value = index;

        const label = document.createElement("label");
        label.htmlFor = "answer" + index;
        label.innerText = answer.text;

        inputGroup.appendChild(radio);
        inputGroup.appendChild(label);
        answerButtons.appendChild(inputGroup);
    });
}

function resetState() {
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

nextButton.addEventListener("click", () => {
    const answerIndex = Array.from(answerButtons.querySelectorAll("input")).findIndex((radio) => radio.checked);
    if (answerIndex !== -1) {
        const selectedAnswer = shuffledQuestions[currentQuestionIndex].answers[answerIndex];
        if (selectedAnswer.correct) {
            score++;
            answerButtons.classList.add('correct-answer');
        } else {
            answerButtons.classList.add('incorrect-answer');
            setTimeout(() => {
                answerButtons.classList.remove('correct-answer', 'incorrect-answer');
                currentQuestionIndex++;
                if (shuffledQuestions.length > currentQuestionIndex) {
                    setNextQuestion();
                } else {
                    endQuiz();
                }
                resetTimer(); // Reset de timer als een vraag wordt overgeslagen
            }, 1000);
        }
             }         else {
        alert("Selecteer alstublieft een antwoord.");
    }
});

restartButton.addEventListener("click", startQuiz);

function endQuiz() {
    questionContainer.style.display = "none";
    nextButton.classList.add("hide");
    restartButton.classList.remove("hide");
    resultDiv.classList.remove("hide");
    resultDiv.innerText = `Je eindscore: ${score} / ${shuffledQuestions.length}`;
}

// Timer element
let timerElement = document.getElementById('timer'); // Dit moet worden vervangen door de ID van het element waarin de timer wordt weergegeven
let interval; // Variabele om het interval bij te houden
let duration = 30; // Standaardduur van de timer

// Functie om de timer te resetten
function resetTimer() {
    clearInterval(interval); // Stop de timer als deze al loopt
    startTimer(); // Start de timer opnieuw
}

// Functie om een vraag over te slaan en de timer te resetten
function skipQuestion() {
    clearInterval(interval); // Stop de timer
    currentQuestionIndex++; // Ga naar de volgende vraag
    if (shuffledQuestions.length > currentQuestionIndex) {
        setNextQuestion(); // Toon de volgende vraag
        resetTimer(); // Reset de timer voor de nieuwe vraag
    } else {
        endQuiz(); // Einde van de quiz
    }
}

function startTimer() {
    let timer = duration;
    let minutes, seconds;

    interval = setInterval(updateTimer, 1000); // Start de timer

    function updateTimer() {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        timerElement.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(interval); // Stop de timer
            skipQuestion(); // Ga naar de volgende vraag
        }
    }
}

// Start de timer wanneer de pagina geladen is
window.onload = function () {
    startTimer();
};
