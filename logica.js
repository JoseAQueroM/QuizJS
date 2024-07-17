const question = [
    {        
        questions: '¿Cual es el continente más grande del planeta?',
        options: ['Asia', 'Europa', 'America', 'Africa'],
        correct: 'Asia',
    },
    {        
        questions: '¿Cuánto vale Pi aproximadamente?',
        options: ['3.14', '3.63', '3.29', '3.15'],
        correct: '3.14',
    },
    {
        questions: '¿Donde cayeron las bombas atómicas durante la segunda guerra mundial?',
        options: ['Tokio', 'Hiroshima y Nagasaki', 'Berlin', 'Moscu'],
        correct: 'Hiroshima y Nagasaki',
    },
    {
        questions: '¿Cual es el simbolo quimico de la plata?',
        options: ['Au', 'Ag', 'Pt', 'Fe'],
        correct: 'Ag',
    },
    {
        questions: '¿Cual es el planeta mas grande del sistema solar?',
        options: ['Marte', 'Venus', 'Jupiter', 'Saturno'],
        correct: 'Jupiter',
    },
    
];

let currentQuestionIndex = 0;
let questionCounter = 1;
let quizCompleted = false;
let numCorrect = 0;

let showQuestions = () => {

    let div = document.querySelector(".questions-Container");
    div.innerHTML = `
        <h1 class="titleQuiz col-12">Quiz</h1>
        <div class="border"></div>

        <div class="container col-12">
        <div class="row row-Container">
            <h3 class="col-12 titleQuestion">${question[currentQuestionIndex].questions}</h3>
            <div class="buttons-Container col-12">
                ${question[currentQuestionIndex].options.map(options => `<button class="btn button col-12 col-md-5 mt-1 mb-1 mr-1">${options}</button>`).join('')}
                <br>
                <button id="next" class="btn nextQuestion col-md-4 col-12 mt-3">Siguiente</button>

               
                    <h3 class="mt-3"> <span id="counter">1</span><span>/5</span> </h3>
                    <h5 id="score"></h5>

            </div>
        </div>
        </div>`;
    

    let nextButton = document.querySelector('.nextQuestion');
    let score = document.getElementById('score');
    console.log(score);

    nextButton.disabled = true;

    const resetQuiz = () => {
        currentQuestionIndex = 0;
        questionCounter = 1;
        quizCompleted = false; 
        numCorrect = 0;
        showQuestions(); 
        document.querySelector('#counter').textContent = questionCounter;
    };
    

    nextButton.addEventListener('click', () => {
        if(!quizCompleted) {
            if(currentQuestionIndex < question.length - 1) {
                currentQuestionIndex++;
                questionCounter++;
    
                showQuestions();
                
            } else {
                nextButton.innerHTML = "Reiniciar Quiz";
                nextButton.disabled = false; 
                score.innerHTML = `Respuestas correctas: ${numCorrect}`;
                quizCompleted = true; 
            }
        } else {
            resetQuiz(); 
        }
    
        document.querySelector('#counter').textContent = questionCounter;
    });
    
    updateButtons();
    
};


const comprobarRespuesta = (botones) => {

    
    botones.forEach(button => {
        button.addEventListener('click', () => {


            let nextButton = document.querySelector('.nextQuestion');
            nextButton.disabled = false;

            botones.forEach(btn => btn.disabled = true);

            let correctButton;
            for (let i = 0; i < botones.length; i++) {
                
                if(botones[i].textContent === question[currentQuestionIndex].correct){
                    correctButton = botones[i];
                    break;
                }
                
            }

            if(button.textContent === question[currentQuestionIndex].correct) {
                numCorrect++;
                console.log(numCorrect);
                button.classList.remove('button');
                button.classList.add('correct');
                
               
            } else {
                console.log('mal');

                button.classList.remove('button');
                button.classList.add('incorrect');

                if(correctButton){

                    correctButton.classList.add('correct');

                }

            }

        });

    });
};


const updateButtons = () => {
    const buttons = document.querySelectorAll('.btn.button');
    comprobarRespuesta(buttons);
};

showQuestions();
