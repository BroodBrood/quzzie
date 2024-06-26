const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const resultDiv = document.getElementById("result");

let shuffledQuestions, currentQuestionIndex, score;

const questions = [
    {
        question: "Wie is de hoofdpersoon van GTA V?",
        answers: [
            { text: "Trevor Phillips", correct: false },
            { text: "Michael De Santa", correct: false },
            { text: "Franklin Clinton", correct: false },
            { text: "Alle bovenstaande", correct: true }
        ]
    },
    {
        question: "Welke stad is het hoofdtoneel van GTA V?",
        answers: [
            { text: "Los Santos", correct: true },
            { text: "Vice City", correct: false },
            { text: "Liberty City", correct: false },
            { text: "San Fierro", correct: false }
        ]
    },
    {
        question: "Wat is de naam van Michael's zoon in het spel?",
        answers: [
            { text: "Jimmy", correct: true },
            { text: "Franklin", correct: false },
            { text: "Lamar", correct: false },
            { text: "Trevor", correct: false }
        ]
    },
    {
        question: "Wat is de naam van de hond van Franklin in GTA V?",
        answers: [
            { text: "Chop", correct: true },
            { text: "Buster", correct: false },
            { text: "Duke", correct: false },
            { text: "Max", correct: false }
        ]
    },
    {
        question: "Welk personage is een voormalige militaire piloot in GTA V?",
        answers: [
            { text: "Trevor Philips", correct: false },
            { text: "Michael De Santa", correct: false },
            { text: "Franklin Clinton", correct: false },
            { text: "Ron Jakowski", correct: true }
        ]
    },
    {
        question: "Welk van de volgende personages is een corrupte FBI-agent?",
        answers: [
            { text: "Dave Norton", correct: true },
            { text: "Steve Haines", correct: false },
            { text: "Solomon Richards", correct: false },
            { text: "Lamar Davis", correct: false }
        ]
    },
    {
        question: "Welke van de volgende voertuigen wordt gebruikt voor de meeste van de overvallen in GTA V?",
        answers: [
            { text: "Kuruma", correct: true },
            { text: "Sultan", correct: false },
            { text: "Faggio", correct: false },
            { text: "Gauntlet", correct: false }
        ]
    },
    {
        question: "Welk beroep heeft Michael De Santa voordat hij met pensioen gaat?",
        answers: [
            { text: "Brandweerman", correct: false },
            { text: "Politieagent", correct: false },
            { text: "Bankovervaller", correct: true },
            { text: "Verzekeringsagent", correct: false }
        ]
    },
    {
        question: "Wat is de naam van de woestijnachtige omgeving ten noorden van Los Santos in GTA V?",
        answers: [
            { text: "Sandy Shores", correct: true },
            { text: "Vinewood Hills", correct: false },
            { text: "Paleto Bay", correct: false },
            { text: "Mount Chiliad Wilderness", correct: false }
        ]
    },
    {
        question: "Welk personage is een voormalige bankovervaller en een vriend van Michael in GTA V?",
        answers: [
            { text: "Lester Crest", correct: false },
            { text: "Lamar Davis", correct: false },
            { text: "Ron Jakowski", correct: false },
            { text: "Trevor Philips", correct: true }
        ]
    },
    {
        question: "Welke van de volgende locaties is een gevangenis in GTA V?",
        answers: [
            { text: "Bolingbroke Penitentiary", correct: true },
            { text: "Fort Zancudo", correct: false },
            { text: "Los Santos International Airport", correct: false },
            { text: "Mount Gordo Penitentiary", correct: false }
        ]
    },
    {
        question: "Welk personage is een voormalige drugsdealer en een vriend van Franklin in GTA V?",
        answers: [
            { text: "Lamar Davis", correct: true },
            { text: "Lester Crest", correct: false },
            { text: "Ron Jakowski", correct: false },
            { text: "Trevor Philips", correct: false }
        ]
    },
    {
        question: "Wat is de naam van het radiostation in GTA V dat hiphop en rapmuziek uitzendt?",
        answers: [
            { text: "Radio Mirror Park", correct: false },
            { text: "West Coast Classics", correct: true },
            { text: "Los Santos Rock Radio", correct: false },
            { text: "The Lab", correct: false }
        ]
    },
    {
        question: "Wat is de naam van de mijnstad ten noorden van Los Santos in GTA V?",
        answers: [
            { text: "Grapeseed", correct: false },
            { text: "Harmony", correct: false },
            { text: "Paleto Bay", correct: true },
            { text: "Sandy Shores", correct: false }
        ]
    },
    {
        question: "Welke van de volgende voertuigen is een gepantserde sportwagen in GTA V?",
        answers: [
            { text: "Armored Kuruma", correct: true },
            { text: "Insurgent", correct: false },
            { text: "Dubsta", correct: false },
            { text: "Granger", correct: false }
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
        }
        
        setTimeout(() => {
            answerButtons.classList.remove('correct-answer', 'incorrect-answer');
            currentQuestionIndex++;
            if (shuffledQuestions.length > currentQuestionIndex) {
                setNextQuestion();
                resetTimer(); // Reset de timer voor de nieuwe vraag
            } else {
                endQuiz();
            }
        }, 1000);
    } else {
        alert("Selecteer alstublieft een antwoord.");
    }
});


restartButton.addEventListener("click", startQuiz);

function endQuiz() {
    questionContainer.style.display = "none";
    nextButton.classList.add("hide"); // Hide the "Next" button
    restartButton.classList.add("hide"); // Hide the "Restart" button
    resultDiv.classList.add("hide"); // Hide the end score
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
