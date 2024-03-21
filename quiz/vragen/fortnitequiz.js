const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const resultDiv = document.getElementById("result");

let shuffledQuestions, currentQuestionIndex, score;

const questions = [
    {
        question: "Hoeveel spelers worden er normaal gesproken in één Fortnite-wedstrijd geplaatst?",
        answers: [
            { text: "50", correct: false },
            { text: "100 ", correct: true },
            { text: "150", correct: false },
            { text: "200", correct: false }
        ]
    },
    {
        question: "Welke locatie op de Fortnite-map is het meest bekend?",
        answers: [
            { text: "Pleasant Park", correct: false },
            { text: "Retail Row", correct: false },
            { text: "Tilted Towers ", correct: true },
            { text: "Lazy Lake", correct: false }
        ]
    },
    {
        question: "Welke modus is niet beschikbaar in Fortnite?",
        answers: [
            { text: "Solo", correct: false },
            { text: "Duos", correct: false },
            { text: "Triples ", correct: true },
            { text: "Squads", correct: false }
        ]
    },
    {
        question: "Wat is de naam van het energiegebied dat zich op de Fortnite-map bevindt en spelers dwingt om naar het midden te bewegen?",
        answers: [
            { text: "De Storm ", correct: true },
            { text: "De Mist", correct: false },
            { text: "De Wervelwind", correct: false },
            { text: "De Tornado", correct: false }
        ]
    },
    {
        question: "Welk materiaal kan niet worden gebruikt om te bouwen in Fortnite?",
        answers: [
            { text: "Hout", correct: false },
            { text: "Staal", correct: false },
            { text: "Goud ", correct: true },
            { text: "Bakstenen", correct: false }
        ]
    },
    {
        question: "Welke kleur heeft het zeldzaamste loot in Fortnite?",
        answers: [
            { text: "Grijs", correct: false },
            { text: "Blauw", correct: false },
            { text: "Paars", correct: false },
            { text: "Oranje ", correct: true }
        ]
    },
    {
        question: "Wat is de maximale hoeveelheid bouwmateriaal die een speler kan dragen in totaal in Fortnite?",
        answers: [
            { text: "500", correct: false },
            { text: "999", correct: false },
            { text: "1500 ", correct: true },
            { text: "2000", correct: false }
        ]
    },
    {
        question: "Welke kleur heeft de minst zeldzame loot in Fortnite?",
        answers: [
            { text: "Grijs ", correct: true },
            { text: "Blauw", correct: false },
            { text: "Paars", correct: false },
            { text: "Oranje", correct: false }
        ]
    },
    {
        question: "Wat is de naam van de gigantische storm die spelers naar elkaar drijft tijdens een Fortnite-wedstrijd?",
        answers: [
            { text: "De Muur", correct: false },
            { text: "De Grens", correct: false },
            { text: "De Cirkel ", correct: true },
            { text: "De Barrière", correct: false }
        ]
    },
    {
        question: "Wat is de naam van de speelmodus waarin spelers als teams van 20 tegen elkaar vechten?",
        answers: [
            { text: "Team Rumble ", correct: true },
            { text: "Squad Showdown", correct: false },
            { text: "Battle Royale Blitz", correct: false },
            { text: "Team Warfare", correct: false }
        ]
    },
    {
        question: "Welke van de volgende items laat spelers toe om te teleporteren in Fortnite?",
        answers: [
            { text: "Rift-to-Go ", correct: true },
            { text: "Grappling Hook", correct: false },
            { text: "Bouncer Pad", correct: false },
            { text: "Port-a-Fort", correct: false }
        ]
    },
    {
        question: "Wat is de maximale hoeveelheid spelers die in een Squad-wedstrijd kunnen deelnemen in Fortnite?",
        answers: [
            { text: "2", correct: false },
            { text: "3", correct: false },
            { text: "4 ", correct: true },
            { text: "5", correct: false }
        ]
    },
    {
        question: "Wat is de maximale hoeveelheid gezondheid die een speler kan hebben in Fortnite?",
        answers: [
            { text: "100", correct: false },
            { text: "125", correct: false },
            { text: "150", correct: false },
            { text: "200 ", correct: true }
        ]
    },
    {
        question: "Welk item in Fortnite laat spelers toe om te zweven en opnieuw te landen met behulp van een parachute?",
        answers: [
            { text: "Launch Pad ", correct: true },
            { text: "Glider Redeploy", correct: false },
            { text: "Shockwave Grenade", correct: false },
            { text: "Bouncer Pad", correct: false }
        ]
    },
    {
        question: "Welk Fortnite-personage is bekend om zijn 'default dance' en werd wereldwijd een internetmeme?",
        answers: [
            { text: "Jonesy ", correct: true },
            { text: "Peely", correct: false },
            { text: "Fishstick", correct: false },
            { text: "The Visitor", correct: false }
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
    questionElement.innerText = question.question;
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
        if (shuffledQuestions[currentQuestionIndex].answers[answerIndex].correct) {
            score++;
        }
        currentQuestionIndex++;
        if (shuffledQuestions.length > currentQuestionIndex) {
            setNextQuestion();
        } else {
            endQuiz();
        }
    } else {
        alert("Please select an answer.");
    }
});

restartButton.addEventListener("click", startQuiz);

function endQuiz() {
    questionContainer.style.display = "none";
    nextButton.classList.add("hide");
    restartButton.classList.remove("hide");
    resultDiv.classList.remove("hide");
    resultDiv.innerText = `Your final score: ${score} / ${shuffledQuestions.length}`;
}
