const sr = ScrollReveal({
    origin: 'top',
    distance: '30px',
    duration: 700,
    reset: true
})

sr.reveal(
    `
   `, { interval: 100 }
)

let currentQuestion = 0;
let correctAnswers = 0;

showQuestion();

function showQuestion() {

    if (questions[currentQuestion]) {

        let q = questions[currentQuestion]

        let pct = Math.floor((currentQuestion / questions.length) * 100);

        document.querySelector('.quiz-box h1').style.display = 'block'
        document.querySelector('.questionArea').style.display = 'block'
        document.querySelector('.questionArea').style.pointerEvents = '';
        document.querySelector('.goButton').style.display = 'none';
        document.querySelector('.question').innerHTML = q.question;
        document.querySelector('.progress-bar').style.width = `${pct}%`;

        let optionsHTML = '';

        q.options.forEach((item, indice) => {
            optionsHTML += `<div data-op='${Number(indice)}' class='option'> <span>${indice + 1}</span> ${item}</div>`
        });

        document.querySelector('.options').innerHTML = optionsHTML;

        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', clickedOption);
        })

    }

    function clickedOption(e) {
        let el = e.target;
        let clickedOption = parseInt(e.target.getAttribute('data-op'));
        let answer = questions[currentQuestion].answer;
        let greenAnswer = document.querySelectorAll('.options .option');
        document.querySelector('.questionArea').style.pointerEvents = 'none';

        if (clickedOption === answer) {
            correctAnswers++;
            el.style.backgroundColor = '#28e728';
        } else {
            greenAnswer.forEach(item => {
                let dataAttribute = Number(item.getAttribute('data-op'));
                if (dataAttribute === questions[currentQuestion].answer) item.style.backgroundColor = '#28e728';
            });
            el.style.backgroundColor = 'red';
        }

        currentQuestion++;
        document.querySelector('.goButton').style.display = 'flex';
    }
};

document.querySelector('.goButton').addEventListener('click', () => {
    if (currentQuestion < questions.length) showQuestion();
    else finishQuiz();
})



function finishQuiz() {
    document.querySelector('.progress-bar').style.width = `100%`
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.goButton').style.display = 'none';
    document.querySelector('.score-area').style.display = 'block';
    document.querySelector('.quiz-box h1').style.display = 'none';

    let pct = Math.floor((correctAnswers / questions.length) * 100);
    document.querySelector('.score-correct').innerHTML = `Acertou ${correctAnswers} de ${questions.length} questões.`;
    document.querySelector('.score-pct').innerHTML = `${pct}%`;

    console.log(correctAnswers)


    document.querySelector('.score-area button').addEventListener('click', () => {
        document.querySelector('.quiz-box h1').style.display = 'block';
        currentQuestion = 0;
        correctAnswers = 0;
        document.querySelector('.score-area').style.display = 'none';
        showQuestion();
    })


    if (correctAnswers < 5) {
        document.querySelector('.score-title').innerText = 'GOY';
        document.querySelector('.score-title').style.color = 'Red';
        document.querySelector('.score-descriptor').innerText = ' É um Jamelão mesmo, ainda lhe falta muito conhecimento sobre o mundo dos Cones, deveria se sentir envergonhado.';
    }
    if (correctAnswers >= 5) {
        document.querySelector('.score-title').innerText = 'JAMELÃO';
        document.querySelector('.score-title').style.color = '#09d8fd';
        document.querySelector('.score-descriptor').innerText = 'Seu conhecimento sobre os Cones está razoável, mas ainda tem muito a melhorar. ';
    }
    if (correctAnswers >= 10) {
        document.querySelector('.score-title').innerText = 'CONE MASTER';
        document.querySelector('.score-title').style.color = '#28e728';
        document.querySelector('.score-descriptor').innerText = 'Altamente ligado no mundo dos Cones, bom trabalho soldado.';
    }
}