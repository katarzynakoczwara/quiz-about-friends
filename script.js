const startMessage = document.querySelector('.start-message');
const input = document.querySelector('.input');
const error = document.querySelector('.error');
const startBtn = document.querySelector('.start-btn');
const questionContainer = document.querySelector('.question-container');
const questionNumberContainer = document.querySelector('.question-number');
const scoresContainer = document.querySelector('.scores');
const question = document.querySelector('.question');
const answersContainer = document.querySelector('.answers-container');
const nextBtn = document.querySelector('.next-btn');
const endGameContainer = document.querySelector('.end-game');
const result = document.querySelector('.result');
const scoresBtn = document.querySelector('.score-btn');
const restartBtn = document.querySelectorAll('.restart-btn');
const resultContainer = document.querySelector('.results');
const scoreList = document.querySelector('.score-list');

let username;
let currentQuestion = 0;
let questionNumber = 1;
let scores = 0;
let answerArray = [];
let indexOfCorrectAnswer = 0;
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const questions = [
    {
        question: 'The series Friends is set in which city?',
        options: [
            'Los Angelese',
            'New York City', 
            'Miami',
            'Seattle'
        ],
        answer: 1
    }, 
    {
        question: 'What pet did Ross own?',
        options: [
            'A dog named Keith',
            'A rabbit called Lancelot',
            'A monkey named Marcel',
            'A lizard named Alistair'
        ],
        answer: 2
    },
    {
        question: 'What is Monica skilled at?',
        options: [
            'Bricklaying',
            'Cooking',
            'American football',
            'Singing'
        ],
        answer: 1
    },
    {
        question: 'What song is Phoebe best known for?',
        options: [
            'Smelly Cat',
            'Smelly Dog',
            'Smelly Rabbit',
            'Smelly Worm'
        ],
        answer: 0
    },
    {
        question: 'What job does Ross have?',
        options: [
            'Paleontologist',
            'Artist',
            'Photographer',
            'Insurance salesman'
        ],
        answer: 0
    },
    {
        question: 'What does Joey never share?',
        options: [
            'His books',
            'His food',
            'His DVDs',
            'His information'
        ],
        answer: 1
    },
    {
        question: 'What is Janice most likely to say?',
        options: [
            'Talk to the hand!',
            'Get me a coffy!',
            'No way!',
            'Oh... My... God!'
        ],
        answer: 3
    },
    {
        question: 'What are Ross and Monica’s parents called?',
        options: [
            'Jack and Jill',
            'Philip and Holly',
            'Jack and Judy',
            'Margaret and Peter'
        ],
        answer: 2
    },
    {
        question: 'When Ross and Rachel were“on a break,”Ross slept with Chloe. Where does she work?',
        options: [
            "Domino's",
            'Bank of America',
            'Mirosoft',
            'Xerox'
        ],
        answer: 3
    },
    {
        question: 'What is the name of Rachel’s Sphynx cat?',
        options: [
            'Baldy',
            'Mrs. Whiskerson',
            'Felix',
            'Sid'
        ],
        answer: 3
    },
]

const startGame = () => {
    if(input.value !== '') {
        username = input.value;
        startMessage.classList.add('hide');
        questionContainer.classList.remove('hide');
        shuffleArray(questions);
        setQuestion();
    } else {
        error.style.opacity = '1';
    }
}

const shuffleArray = array => array.sort( () => Math.random() - 0.5 );

const setQuestion = () => {    
    answerArray = [];
    nextBtn.style.visibility = 'hidden';
    if(currentQuestion < questions.length) {
        questionNumberContainer.textContent = `Question ${questionNumber} / ${questions.length}`;
        question.textContent = questions[currentQuestion].question;
        answersContainer.textContent = '';
        indexOfCorrectAnswer = questions[currentQuestion].answer;        
        questions[currentQuestion].options.forEach(option => {
            const answerBtn = document.createElement('button');
            answerBtn.textContent = option;
            answerBtn.classList.add('answer-btn');            
            answerBtn.addEventListener('click', checkAnswer);            
            answersContainer.appendChild(answerBtn);
            answerArray.push(answerBtn);
        });
        currentQuestion++;
        questionNumber++;  
    } else {
        questionContainer.classList.add('hide');
        addToLocalStorage();
        endGame();        
    }      
}

const checkAnswer = (e) => {
    nextBtn.style.visibility = 'visible';
    const button = e.target;
    if(answerArray.indexOf(button) === indexOfCorrectAnswer) {
        button.classList.add('correct');
        scores += 100;
        scoresContainer.textContent = `${scores} Scores`;
    } else {
        button.classList.add('wrong')
    }

    answerArray.forEach(answer => {
        answer.removeEventListener('click', checkAnswer);
    });
}

const checkKey = (e) => {
    if(e.key === 'Enter') {
        startGame();
    }
}

const endGame = () => {
    endGameContainer.classList.remove('hide');
    result.textContent = `${username} get ${scores} scores!`
}

const addToLocalStorage = () => {    
    const score = {
        name: username,
        score: scores
    }
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(3);
    localStorage.setItem('highScores', JSON.stringify(highScores))
}

const showHighScores = () => {
    endGameContainer.classList.add('hide');
    resultContainer.classList.remove('hide');    
    const scoreArray = JSON.parse(localStorage.getItem('highScores'));
    for(const score of scoreArray) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<span>${score.name}</span><span>${score.score}</span>`;
        scoreList.appendChild(listItem);
    }
    
}

input.addEventListener('keyup', checkKey);
startBtn.addEventListener('click', startGame);
nextBtn.addEventListener('click', setQuestion);
scoresBtn.addEventListener('click', showHighScores);
restartBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        // console.log(window.location.href)
        const url = window.location.href;
        window.location.assign(url);
    })
});

