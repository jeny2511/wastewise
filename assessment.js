import {
    db,
    collection,
    addDoc
} from "./firebase.js";

const questionContainer = document.getElementById("question-container");
const quizForm = document.getElementById("quiz-form");
const resultDiv = document.getElementById("result");

const nameSection =
document.getElementById("name-section");

const userNameInput =
document.getElementById("userName");

const startBtn =
document.getElementById("start-btn");

// Shuffle array
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Select random 15 questions
const selectedQuestions = shuffleArray([...questions]).slice(0, 15);

// Display Questions
function loadQuestions() {

    selectedQuestions.forEach((q, index) => {

        const questionBlock = document.createElement("div");

        questionBlock.classList.add("question");

        let html = `
            <h3>Q${index + 1}. ${q.question}</h3>
        `;

        q.options.forEach(option => {

            html += `
                <label>
                    <input 
                        type="radio"
                        name="question${index}"
                        value="${option}"
                    >
                    ${option}
                </label><br>
            `;
        });

        questionBlock.innerHTML = html;

        questionContainer.appendChild(questionBlock);
    });
}

loadQuestions();

startBtn.addEventListener("click", () => {

    console.log("Button Clicked");

    const userName =
        userNameInput.value.trim();

    if(userName === ""){

        alert("Please enter your name");

        return;
    }

    localStorage.setItem(
        "userName",
        userName
    );

    nameSection.style.display = "none";

    quizForm.style.display = "block";

});

// Submit Quiz
quizForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    let score = 0;

    let weakAreas = {};

    selectedQuestions.forEach((q, index) => {

        const selectedAnswer = document.querySelector(
            `input[name="question${index}"]:checked`
        );

        if (selectedAnswer) {

            if (selectedAnswer.value === q.answer) {

                score++;

            } else {

                weakAreas[q.topic] =
                    (weakAreas[q.topic] || 0) + 1;
            }

        } else {

            weakAreas[q.topic] =
                (weakAreas[q.topic] || 0) + 1;
        }

    });

    let weakTopics = Object.keys(weakAreas);
    const userName = localStorage.getItem("userName");
    localStorage.setItem(
    "weakTopics",
    JSON.stringify(weakTopics)
);

try {

    await addDoc(
        collection(db, "assessments"),
        {
            name: userName,
            score: score,
            totalQuestions: 15,
            weakTopics: weakTopics,
            timestamp: new Date()
        }
    );

    console.log("Assessment saved");

}
catch(error){

    console.error(
        "Firebase Error:",
        error
    );

}

resultDiv.innerHTML = `
    <h2>Great Job, ${userName}! 🎉</h2>

    <h2>Your Score: ${score}/15</h2>

    <p>
        You answered ${score} questions correctly.
    </p>

        <h3>Areas to Improve:</h3>

        <ul>
            ${weakTopics.map(topic => `<li>${topic}</li>`).join("")}
        </ul>

        <a href="learning.html">
            Learn More
        </a>
    `;

    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    });

});