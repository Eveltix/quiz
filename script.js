let welcomeScreen = document.querySelector(".welcome")
let quizScreen = document.querySelector(".quiz")
let resultScreen = document.querySelector(".result")
let startQuizBtn = document.querySelector(".start-quiz-btn")
let answerBtns = document.querySelectorAll(".answer")
let restartQuizBtn = document.querySelector(".restart-quiz-btn")

let quizQuestion = document.querySelector(".quiz__question")
let resultTitle = document.querySelector(".result__title")

let timerElement = document.querySelector(".timer")
let interval
let startTimerValue = 10

function startTimer() {
    timerElement.innerHTML = startTimerValue

    interval = setInterval(function () {
        if (startTimerValue == 1) { 
            timerElement.innerHTML = 0
            clearInterval(interval)
            showQuestionResult("red")
            showNextQuestion()
        } else {
            startTimerValue--
            timerElement.innerHTML = startTimerValue
        }
    }, 1000)
}


let allQustion = [
    {
        question: "Скільки у світі є країн?",
        answers: [274, 193, 80, 7, 195],
        correctAnswer: 193
    },
    {
        question: "Скільки є у світі океанів?",
        answers: [9, 8, 1, 5, 4],
        correctAnswer: 4
    },
    { 
        question: "Скільки у світі є мов?",
        answers: [70000, 7151, 200, 193,10],
        correctAnswer: 7151
    },
    {
        question: "Скільки країн є у євросоюзі?",
        answers: [28, 27, 20, 3, 5],
        correctAnswer: 27
    },
    {
        question: "Скільки є материків?",
        answers: [6, 8, 2, 9, 7],
        correctAnswer: 6,
    },
    {
        question: "Скільки є єкономічних союзів у світі?",
        answers: [3, 8, 10, 1, 4],
        correctAnswer: 8,
    },
    {
        question: "Скільки у світі є релігій?",
        answers: [7, 3, 2, 9, 1],
        correctAnswer: 7,
    },
    {
        question: "Зі скількох штатів складається Америка?",
        answers: [8, 50, 21, 9, 0],
        correctAnswer: 50,
    },
    {
        question: "Скільки міст має Україна?",
        answers: [200, 31, 5, 870, 461],
        correctAnswer: 461,
    },
    {
        question: "Який у вас настрiй?",
        answers: [10, 5, 1, 9, 7],
        correctAnswer: 10,
    }
]

let userPoint = 0
let currQustionNumber = 0

function renderQuestion(quest) {
    quizQuestion.innerHTML = quest.question
    let sorted= shuffle(quest.answers)
    startTimer()
    answerBtns.forEach((btn,i) => btn.innerHTML = sorted[i])
}

function showQuestionResult(color) {
    quizScreen.style.background = color

    setTimeout(() => {
        quizScreen.style.background = 'url("https://catherineasquithgallery.com/uploads/posts/2023-02/1676586293_catherineasquithgallery-com-p-fon-geografiya-zelenii-180.jpg") 0 0 /cover no-repeat'
    }, 600)
}

function disabledButton(option) {
    answerBtns.forEach(btn => btn.disabled = option)
}

function runQuiz() {
    deleteActiveScreen()
    quizScreen.classList.add("active")
    currQustionNumber = 0
    userPoint = 0
    renderQuestion(allQustion[currQustionNumber])
    
}

function finishQuiz() {
    deleteActiveScreen()
    resultScreen.classList.add("active")
    resultTitle.innerHTML = `Вітаю, ти закінчив опитування і отримав ${userPoint} з ${allQustion.length}`
}

function deleteActiveScreen() {
    welcomeScreen.classList.remove("active")
    quizScreen.classList.remove("active")
    resultScreen.classList.remove("active")
}

startQuizBtn.addEventListener("click", runQuiz)
restartQuizBtn.addEventListener("click", runQuiz)

answerBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        clearInterval(interval)

        if (btn.innerHTML == allQustion[currQustionNumber].correctAnswer) {
            userPoint ++
            showQuestionResult("lightgreen")
        } else {
            showQuestionResult("red")
        }

       showNextQuestion() 
    })
})

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function renderQuestion(quest) {
    quizQuestion.innerHTML = quest.question
    answerBtns.forEach((btn, i) => btn.innerHTML = quest.answers[i])
    startTimer()
}

function showNextQuestion() {

    disabledButton(true)

    startTimerValue = 10

    setTimeout(() => {
            if (currQustionNumber == allQustion.length - 1) {
                finishQuiz()
            } else {
                currQustionNumber++
                renderQuestion(allQustion[currQustionNumber])
                
            }
            disabledButton(false)
        }, 800)
}

