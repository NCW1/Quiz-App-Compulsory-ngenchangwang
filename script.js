const quizContainer = document.getElementById('quiz-container');
const resultsContainer = document.getElementById('results-container');
const checkAnswersBtn = document.getElementById('check-answers-btn');
const resetBtn = document.getElementById('reset-btn');

const questions = [
	{
		question: 'What does HTML stand for?',
		choices: ['Hyperlinks and Text Markup Language', 'Home Tool Markup Language', 'HyperText Markup Language', 'Hyper Technical Markup Language'],
		correctAnswer: 2
	},
	{
		question: 'Which CSS property is used to change the text color of an element?',
		choices: ['color', 'text-color', 'font-color', 'text-style'],
		correctAnswer: 0
	},
	{
		question: 'What is the correct HTML element for creating a hyperlink?',
		choices: ['hyperlink', 'link', 'href', 'a'],
		correctAnswer: 3
	},
	{
		question: 'Which CSS property is used to add space between the border and content of an element?',
		choices: ['margin', 'padding', 'border-spacing', 'spacing'],
		correctAnswer: 1
	},
	{
		question: 'In CSS, which selector is used to select elements with a specific class?',
		choices: [':', '#', '*', '.'],
		correctAnswer: 3
	}
];

function buildQuiz() {
	questions.forEach((question, index) => {
		const choicesHtml = question.choices.map((choice, choiceIndex) => `
      <li class="choice">
        <input type="radio" id="q${index}-choice${choiceIndex}" name="q${index}" value="${choiceIndex}">
        <label for="q${index}-choice${choiceIndex}">${choice}</label>
      </li>
    `).join('');

		const questionHtml = `
      <div class="question">
        <p class="question-text">(${index + 1}) ${question.question}</p>
        <ul class="choices">${choicesHtml}</ul>
        <div class="feedback" id="q${index}-feedback"></div>
      </div>
    `;

		quizContainer.insertAdjacentHTML('beforeend', questionHtml);
	});
}

function checkAnswers() {
	let numCorrect = 0;

	questions.forEach((question, index) => {
		const choices = document.getElementsByName(`q${index}`);
		const feedbackContainer = document.getElementById(`q${index}-feedback`);

		let selectedChoice = -1;
		choices.forEach((choice, choiceIndex) => {
			if (choice.checked) {
				selectedChoice = choiceIndex;
			}
		});

		if (selectedChoice === -1) {
			feedbackContainer.textContent = 'No Answer Selected!';
			feedbackContainer.classList.add('no-answer');
		}
		else if (selectedChoice === question.correctAnswer) {
			feedbackContainer.textContent = '😀 Correct!';
			feedbackContainer.classList.add('correct');
			numCorrect++;
		}
		else {
			feedbackContainer.textContent = `😥 Wrong! The correct answer is "${question.choices[question.correctAnswer]}"!`;
			feedbackContainer.classList.add('wrong');
		}
	});

	const score = (numCorrect / questions.length) * 100;
	const message = getMessageBasedOnScore(score);

	const scoreHtml = `<p class="score">Your final score is ${score}%</p>`;
	const messageHtml = `<p class="custom-message">${message}</p>`;

	resultsContainer.innerHTML = scoreHtml + messageHtml;
}

function getMessageBasedOnScore(score) {
	if (score === 100) {
		return 'Congratulations! You got a perfect score!';
	}
	else if (score >= 80) {
		return 'Great job! You did very well!';
	}
	else if (score >= 60) {
		return 'Good effort! You passed the quiz!';
	}
	else {
		return 'Keep practising! You can improve!';
	}
}

function resetQuiz() {
	const choices = document.querySelectorAll('input[type="radio"]');
	const feedbackContainers = document.querySelectorAll('.feedback');

	choices.forEach(choice => {
		choice.checked = false;
	});

	feedbackContainers.forEach(container => {
		container.textContent = '';
		container.className = 'feedback';
	});

	resultsContainer.innerHTML = '';
}

checkAnswersBtn.addEventListener('click', checkAnswers);
resetBtn.addEventListener('click', resetQuiz);

buildQuiz();