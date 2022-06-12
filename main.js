const option1 = document.querySelector('.option1'),
	  option2 = document.querySelector('.option2'),
	  option3 = document.querySelector('.option3'),
	  option4 = document.querySelector('.option4');

const optionElements = document.querySelectorAll('.option');

const question = document.getElementById('question');

const numberOfQuestion = document.getElementById('number-of-question'),
	  numberOfAllQuestions = document.getElementById('number-of-all-questions');

let indexOfQuestion,
	indexOfPage = 0;

const answersTracker = document.getElementById('answers-tracker');

const btnNext = document.getElementById('btn-next');

let score = 0;

const correctAnswer = document.getElementById('correct-answer'),
	  numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'),
	  btnTryAgain = document.getElementById('btn-try-again');

const questions = [
	  	{
			question: 'Как в JavaScript вычислить процент от числа?',
			options:  [
					'Так в JavaScript нельзя сделать',
					'Оператор: %',
                    'Умножить на кол-во процентов и разделить на 100',
                    'Вызвать метод findPrecent()',
			],
			rightAnswer: 1
		},
		{
			question: 'Результат выражения: "13" + 7',
            options: [
                  '20',
                  '137',
                  'undefined',
                  'error',
            ],
            rightAnswer: 1
		},
		{
            question: 'На JavaScript нельзя писать:',
            options: [
                  'Игры',
                  'Скрипты для сайтов',
                  'Десктопные приложения',
                  'Плохо',
            ],
            rightAnswer: 3
      	}
];

numberOfAllQuestions.innerHTML = questions.length;

const load = () => {
	question.innerHTML = questions[indexOfQuestion].question;

	option1.innerHTML = questions[indexOfQuestion].options[0];
	option2.innerHTML = questions[indexOfQuestion].options[1];
	option3.innerHTML = questions[indexOfQuestion].options[2];
      option4.innerHTML = questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML = indexOfPage + 1;
    indexOfPage++;
};

let completedAnswers = [];

const randomQuestion = () => {
	let randomNumber = Math.floor(Math.random() * questions.length);
	let hitDuplicate = false;

	if (indexOfPage == questions.length) {
		quizOver()
	} else {
		if (completedAnswers.length > 0) {
				completedAnswers.forEach(item => {
					if(item == randomNumber) {
						hitDuplicate = true;
					};
			});
			if (hitDuplicate) {
				randomQuestion();
			} else {
				indexOfQuestion = randomNumber;
				load();
			};
		};
		if (completedAnswers.length == 0) {
			indexOfQuestion = randomNumber;
			load();
		};
	};
	completedAnswers.push(indexOfQuestion);
};

const checkAnswer = (el) => {
	if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer){
		el.target.classList.add('correct');
		updateAnswerTracker('correct');
		score++;
	} else {
		el.target.classList.add('wrong');
		updateAnswerTracker('wrong');
	};
	disabledOptions();
};

for(option of optionElements) {
	option.addEventListener('click', e => checkAnswer(e));
};

const disabledOptions = () => {
	optionElements.forEach(item => {
		item.classList.add('disabled');
		if(item.dataset.id == questions[indexOfQuestion].rightAnswer) {
			item.classList.add('correct');
		};
	});
};

const enableOptions = () => {
	optionElements.forEach(item => {
		item.classList.remove('disabled', 'correct', 'wrong');
	});
};

const answerTracker = () => {
	questions.forEach(() => {
		const div = document.createElement('div');
		answersTracker.appendChild(div);
	});
};

const updateAnswerTracker = (status) => {
	answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
};

const validate = () => {
	if(!optionElements[0].classList.contains('disabled')) {
		alert('Выберите один из вариантов ответов');
	} else {
		randomQuestion();
		enableOptions();
	};
};

const quizOver = () => {
	document.querySelector('.quiz-over-modal').classList.add('active');
	correctAnswer.innerHTML = score;
	numberOfAllQuestions2.innerHTML = questions.length;
};

const tryAgain = () => {
	window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain);

btnNext.addEventListener('click', () => {
	validate();
});

window.addEventListener('load', () => {
	randomQuestion();
	answerTracker();
});
