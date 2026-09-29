// ================================
// CREATE ACCOUNT
// ================================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function(event) {

        event.preventDefault();

        // Get the information entered by the user
        const username = document.getElementById("newUsername").value;
        const password = document.getElementById("newPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        const message = document.getElementById("registerMessage");

        // Check if passwords match
        if (password !== confirmPassword) {

            message.textContent = "❌ Passwords do not match.";
            return;
        }

        // Check whether a user already exists
        const existingUser = localStorage.getItem("username");

        if (existingUser === username) {

            message.textContent = "❌ This username already exists.";
            return;
        }

        // Save username and password
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);

        // Give the new player separate starting points
        localStorage.setItem("mathPoints", "0");
        localStorage.setItem("memoryPoints", "0");

        // Give the new player starting level
        localStorage.setItem("level", "1");

        message.textContent = "✅ Account created successfully!";

        // Wait 1.5 seconds, then go to login
        setTimeout(function() {
            window.location.href = "login.html";
        }, 1500);

    });
}


// ================================
// LOGIN
// ================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        // Get the details entered by the user
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const message = document.getElementById("loginMessage");

        // Get the saved account details
        const savedUsername = localStorage.getItem("username");
        const savedPassword = localStorage.getItem("password");

        // Check username and password
        if (username === savedUsername && password === savedPassword) {

            message.textContent = "✅ Login successful!";

            // Take the user to the dashboard
            setTimeout(function() {
                window.location.href = "dashboard.html";
            }, 1000);

        } else {

            message.textContent = "❌ Incorrect username or password.";

        }

    });
}


// ================================
// DASHBOARD
// ================================

const displayUsername = document.getElementById("displayUsername");

if (displayUsername) {

    // Get username from localStorage
    const username = localStorage.getItem("username");

    // Display username
    displayUsername.textContent = username;

}


// ================================
// MATH GAME
// ================================

let correctAnswer;
let questionAttempted = false;

let mathPoints =
    Number(localStorage.getItem("mathPoints")) || 0;

const mathQuestion = document.getElementById("mathQuestion");

if (mathQuestion) {

    generateQuestion();

}


function generateQuestion() {

    // Generate two random numbers
    const number1 = Math.floor(Math.random() * 10) + 1;
    const number2 = Math.floor(Math.random() * 10) + 1;

    // Calculate correct answer
    correctAnswer = number1 + number2;

    // New question = no attempts yet
    questionAttempted = false;

    // Display question
    mathQuestion.textContent =
        number1 + " + " + number2 + " = ?";


    // Generate answer choices
    const answers = [
        correctAnswer,
        correctAnswer + 1,
        correctAnswer - 1,
        correctAnswer + 2
    ];

    // Shuffle answers
    answers.sort(() => Math.random() - 0.5);


    // Get answer buttons
    const buttons =
        document.querySelectorAll(".answer-button");


    buttons.forEach(function(button, index) {

        // Change the answer text
        button.textContent = answers[index];

        // Store the answer
        button.dataset.answer = answers[index];

        // Reset button colour
        button.classList.remove("wrong");
        button.classList.remove("correct");

    });

}


function checkAnswer(buttonIndex) {

    const buttons = document.querySelectorAll(".answer-button");

    const selectedButton = buttons[buttonIndex];

    const selectedAnswer =
        Number(selectedButton.dataset.answer);

    const message =
        document.getElementById("gameMessage");

    // Get current Math points
    let points =
        Number(localStorage.getItem("mathPoints")) || 0;


    // ================================
    // CORRECT ANSWER
    // ================================

    if (selectedAnswer === correctAnswer) {

        // Add green line to correct button
        selectedButton.classList.add("correct");

        // First attempt = +10
        if (!questionAttempted) {

            points = points + 10;

            message.textContent =
                "🎉 Correct! +10 points!";

        }

        // Correct after a wrong answer = no bonus
        else {

            message.textContent =
                "🎉 Correct! No extra points this time.";

        }

        // Save Math points
        localStorage.setItem("mathPoints", points);

        // Update points on screen
        document.getElementById("gamePoints").textContent = points;

        // Show balloons
        showBalloons();

        // Wait before showing new question
        setTimeout(function() {

            message.textContent = "";

            generateQuestion();

        }, 1500);

        // Reset attempts for new question
        questionAttempted = false;

    }


    // ================================
    // WRONG ANSWER
    // ================================

    else {

        // Mark that the question has been attempted
        questionAttempted = true;

        // Turn selected button red
        selectedButton.classList.add("wrong");

        // Remove 1 point
        points = points - 1;

        // Don't allow negative points
        if (points < 0) {

            points = 0;

        }

        // Save Math points
        localStorage.setItem("mathPoints", points);

        // Update points
        document.getElementById("gamePoints").textContent = points;

        // Show message
        message.textContent =
            "❌ Try again! -1 point.";

    }
}


// ================================
// BALLOON ANIMATION
// ================================

function showBalloons() {

    const container =
        document.getElementById("balloonContainer");

    if (!container) {
        return;
    }

    // Remove old balloons
    container.innerHTML = "";

    // Create 8 balloons
    for (let i = 0; i < 8; i++) {

        const balloon =
            document.createElement("div");

        balloon.classList.add("balloon");

        // Random position
        balloon.style.left =
            (10 + Math.random() * 80) + "%";

        // Random size
        const size =
            20 + Math.random() * 15;

        balloon.style.width =
            size + "px";

        balloon.style.height =
            (size * 1.25) + "px";

        // Random delay
        balloon.style.animationDelay =
            (Math.random() * 0.3) + "s";

        // Give each balloon a different color
        const colors = [
            "#ff4d4d",
            "#ffd93d",
            "#4dabf7",
            "#51cf66",
            "#cc5de8",
            "#ff922b"
        ];

        balloon.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];

        container.appendChild(balloon);

    }

}


// ================================
// MEMORY MATCH GAME
// ================================

const memoryBoard = document.getElementById("memoryBoard");

if (memoryBoard) {

    // Larger collection of possible cards
    const memoryItems = [
        "🍎", "🍌", "🍉", "🍓",
        "🐱", "🐶", "🐼", "🦁",
        "⭐", "🌈", "☀️", "🌙",
        "🚀", "🚗", "✈️", "🚲",
        "⚽", "🏀", "🎸", "🎨",
        "🍕", "🍔", "🍩", "🍦",
        "🌸", "🌻", "🌳", "🍀"
    ];

    let firstCard = null;
    let secondCard = null;

    let lockBoard = false;
    let matchedPairs = 0;

    let memoryPoints =
        Number(localStorage.getItem("memoryPoints")) || 0;


    // ================================
    // START GAME
    // ================================

    createMemoryGame();


    function createMemoryGame() {

        memoryBoard.innerHTML = "";

        firstCard = null;
        secondCard = null;

        lockBoard = true;

        matchedPairs = 0;


        // Update points
        document.getElementById("memoryPoints").textContent =
            memoryPoints;


        // =================================
        // SELECT 4 RANDOM DIFFERENT ITEMS
        // =================================

        const randomItems = [...memoryItems]
            .sort(() => Math.random() - 0.5)
            .slice(0, 4);


        // Create pairs
        const cards = [
            ...randomItems,
            ...randomItems
        ];


        // Shuffle the 8 cards
        cards.sort(() => Math.random() - 0.5);


        // =================================
        // CREATE THE 8 CARDS
        // =================================

        cards.forEach(function(cardValue, index) {

            const button =
                document.createElement("button");

            button.classList.add("memory-button");

            button.textContent = cardValue;

            button.dataset.value = cardValue;

            button.dataset.index = index;


            // Start revealed
            button.classList.add("open");


            button.addEventListener(
                "click",
                function() {

                    flipCard(button);

                }
            );


            memoryBoard.appendChild(button);

        });


        // =================================
        // SHOW CARDS FOR 3 SECONDS
        // =================================

        document.getElementById("memoryMessage").textContent =
            "👀 Remember the cards!";


        setTimeout(function() {

            const allCards =
                document.querySelectorAll(".memory-button");


            allCards.forEach(function(card) {

                card.textContent = "❓";

                card.classList.remove("open");

            });


            lockBoard = false;


            document.getElementById("memoryMessage").textContent =
                "🧠 Now find the matching pairs!";

        }, 3000);

    }


    // ================================
    // FLIP CARD
    // ================================

    function flipCard(card) {

        // Don't allow clicking during preview
        if (lockBoard) {
            return;
        }


        // Don't click same card twice
        if (card === firstCard) {
            return;
        }


        // Don't click an already matched card
        if (card.classList.contains("matched")) {
            return;
        }


        // Reveal card
        card.textContent =
            card.dataset.value;

        card.classList.add("open");


        // First card
        if (!firstCard) {

            firstCard = card;

            return;

        }


        // Second card
        secondCard = card;


        checkMemoryMatch();

    }


    // ================================
    // CHECK MATCH
    // ================================

    function checkMemoryMatch() {

        const message =
            document.getElementById("memoryMessage");


        // =================================
        // MATCH
        // =================================

        if (
            firstCard.dataset.value ===
            secondCard.dataset.value
        ) {

            firstCard.classList.add("matched");

            secondCard.classList.add("matched");


            // +5 points
            memoryPoints += 5;


            localStorage.setItem(
                "memoryPoints",
                memoryPoints
            );


            document.getElementById("memoryPoints").textContent =
                memoryPoints;


            message.textContent =
                "🎉 Great match! +5 points!";


            matchedPairs++;


            resetCards();


            // =================================
            // ALL PAIRS FOUND
            // =================================

            if (matchedPairs === 4) {

                setTimeout(function() {

                    message.textContent =
                        "🏆 Amazing! You found all the pairs!";

                }, 500);

            }

        }


        // =================================
        // NOT A MATCH
        // =================================

        else {

            lockBoard = true;


            // -1 point
            memoryPoints -= 1;


            // Don't allow negative score
            if (memoryPoints < 0) {

                memoryPoints = 0;

            }


            localStorage.setItem(
                "memoryPoints",
                memoryPoints
            );


            document.getElementById("memoryPoints").textContent =
                memoryPoints;


            message.textContent =
                "❌ Not a match! -1 point.";


            // Close cards after 1 second
            setTimeout(function() {

                firstCard.textContent = "❓";
                secondCard.textContent = "❓";


                firstCard.classList.remove("open");
                secondCard.classList.remove("open");


                resetCards();

            }, 1000);

        }

    }


    // ================================
    // RESET SELECTED CARDS
    // ================================

    function resetCards() {

        firstCard = null;
        secondCard = null;

        lockBoard = false;

    }


    // ================================
    // NEW GAME
    // ================================

    const restartButton =
        document.getElementById("restartMemory");


    restartButton.addEventListener(
        "click",
        function() {

            createMemoryGame();

        }
    );

}
// ================================
// HOMEWORK HELPER - AI SEARCH
// ================================

document.addEventListener("DOMContentLoaded", function() {
    const askButton = document.getElementById("askAIButton");
    const questionInput = document.getElementById("homeworkQuestion");
    const aiAnswerBox = document.getElementById("aiAnswer");

    if (askButton) {
        askButton.addEventListener("click", function() {
            const question = questionInput.value.trim();

            if (question === "") {
                aiAnswerBox.innerHTML = 'Please enter a question.';
            }
        });
    }
});
