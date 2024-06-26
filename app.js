const quizData = [
    {
        question: "What does CPU stand for?",
        options: ["Central Processing Unit", "Central Process Unit", "Computer Personal Unit", "Central Processor Unit"],
        answer: "Central Processing Unit"
    },
    {
        question: "What does RAM stand for?",
        options: ["Random Access Memory", "Random Anything Memory", "Run Access Memory", "Read Access Memory"],
        answer: "Random Access Memory"
    },
    {
        question: "What does HTML stand for?",
        options: ["Hypertext Markup Language", "Hypertext Markdown Language", "Hyperloop Machine Language", "Hyperlink Markup Language"],
        answer: "Hypertext Markup Language"
    }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 15; // 15 seconds for each question
let timer;
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('nextBtn');
const resultElement = document.getElementById('result');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restartBtn');
const timerElement = document.getElementById('time');

function loadQuestion() {
    clearInterval(timer); // Clear any existing timer
    timeLeft = 15;
    timerElement.innerText = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timerElement.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            currentQuestion++;
            if (currentQuestion < quizData.length) {
                loadQuestion();
            } else {
                showResult();
            }
        }
    }, 1000);

    const currentQuizData = quizData[currentQuestion];
    questionElement.innerText = currentQuizData.question;
    optionsElement.innerHTML = '';
    currentQuizData.options.forEach(option => {
        const li = document.createElement('li');
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'option';
        radio.value = option;
        li.appendChild(radio);
        li.appendChild(document.createTextNode(option));
        optionsElement.appendChild(li);
    });
}

function showResult() {
    clearInterval(timer);
    document.getElementById('quiz').style.display = 'none';
    resultElement.style.display = 'block';
    scoreElement.innerText = `You answered ${score} out of ${quizData.length} questions correctly!`;
}

nextButton.addEventListener('click', () => {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption) {
        if (selectedOption.value === quizData[currentQuestion].answer) {
            score++;
        }
        clearInterval(timer); // Stop the timer when moving to the next question
        currentQuestion++;
        if (currentQuestion < quizData.length) {
            loadQuestion();
        } else {
            showResult();
        }
    }
});

restartButton.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    resultElement.style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    loadQuestion();
});

loadQuestion();
