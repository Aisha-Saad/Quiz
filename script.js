const questions = [
    {
        question:"wich is larget animal in the world?",
        answers: [
            {text:"shark", correct:false},
            {text:"elephant", correct:false},
            {text:"whale", correct:true},
            {text:"dog", correct:false},
        ]
       
    },
    {
        question:"What is the largest country in the world?",
        answers: [
            {text:"China", correct:false},
            {text:"Russia", correct:true},
            {text:"United States", correct:false},
            {text:"Egypt", correct:false},
        ]

    }, 
    {
        question:"In what year was the First World War?",
        answers: [
            {text:"1900", correct:false},
            {text:"1950", correct:false},
            {text:"1930", correct:false},
            {text:"1914", correct:true},
        ]

    },
    {
        question:"What is the number of planets in the solar system?",
        answers: [
            {text:"3", correct:false},
            {text:"8", correct:true},
            {text:"9", correct:false},
            {text:"5", correct:false},
        ]

    }
];

const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");


let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    resetState();
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo= currentQuestionIndex + 1;
    questionElement.innerHTML=questionNo+". "+currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);

    });
}

function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;

    }else{
        selectedBtn.classList.add("incorrect")
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true"){
            button.classList.add("correct");
        }

        button.disabled= true;

    });
    nextButton.style.display="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML=` You scored ${score} out of ${questions.length} !`;
    nextButton.innerHTML ="Start Again";
    nextButton.style.display= "block";
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
       
    
    
});

startQuiz();
