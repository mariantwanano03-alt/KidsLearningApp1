// ============================================
// KIDLEARNINGAPP - REWARDS SYSTEM
// ============================================


// ============================================
// 1. GET GAME POINTS
// ============================================

// Math points
// ============================================
// GET CURRENT GAME POINTS
// ============================================

function getGamePoints() {

    const mathPoints =
        Number(localStorage.getItem("mathPoints")) || 0;

    const memoryPoints =
        Number(localStorage.getItem("memoryPoints")) || 0;

    const totalGamePoints =
        mathPoints + memoryPoints;

    return {
        mathPoints,
        memoryPoints,
        totalGamePoints
    };
}


// ============================================
// 2. DISPLAY POINTS
// ============================================

const totalPointsElement =
    document.getElementById("totalGamePoints");

const mathPointsElement =
    document.getElementById("mathPointsDisplay");

const memoryPointsElement =
    document.getElementById("memoryPointsDisplay");

const gamePoints = getGamePoints();

if (totalPointsElement) {
    totalPointsElement.textContent =
        gamePoints.totalGamePoints;
}

if (mathPointsElement) {
    mathPointsElement.textContent =
        gamePoints.mathPoints;
}

if (memoryPointsElement) {
    memoryPointsElement.textContent =
        gamePoints.memoryPoints;
}


// ============================================
// 3. BUNNY GROWTH
// ============================================

let bunnyStageName = "";
let bunnyDescription = "";
let nextStagePoints = 0;
let progress = 0;


if (totalGamePoints < 50) {

    bunnyStageName =
        "Baby Bunny";

    bunnyDescription =
        "Your bunny is just getting started! 🐰";

    nextStagePoints = 50;

    progress =
        (totalGamePoints / 50) * 100;

}


else if (totalGamePoints < 150) {

    bunnyStageName =
        "Little Bunny";

    bunnyDescription =
        "Your bunny is starting to grow! 🌱";

    nextStagePoints = 150;

    progress =
        ((totalGamePoints - 50) / 100) * 100;

}


else if (totalGamePoints < 300) {

    bunnyStageName =
        "Young Bunny";

    bunnyDescription =
        "Wow! Your bunny is growing nicely! ⭐";

    nextStagePoints = 300;

    progress =
        ((totalGamePoints - 150) / 150) * 100;

}


else if (totalGamePoints < 500) {

    bunnyStageName =
        "Big Bunny";

    bunnyDescription =
        "Amazing! Your bunny is getting big! 🎉";

    nextStagePoints = 500;

    progress =
        ((totalGamePoints - 300) / 200) * 100;

}


else {

    bunnyStageName =
        "Angel Bunny";

    bunnyDescription =
        "You unlocked the Angel Bunny stage! 👼🐰";

    nextStagePoints = totalGamePoints;

    progress = 100;

}



// ============================================
// 4. DISPLAY BUNNY STAGE
// ============================================

const stageElement =
    document.getElementById("bunnyStageName");

const descriptionElement =
    document.getElementById("stageDescription");

const nextStageElement =
    document.getElementById("nextStageText");


if (stageElement) {

    stageElement.textContent =
        bunnyStageName;

}


if (descriptionElement) {

    descriptionElement.textContent =
        bunnyDescription;

}


if (nextStageElement) {

    if (totalGamePoints < 500) {

        nextStageElement.textContent =
            "Next stage: " +
            nextStagePoints +
            " points";

    }

    else {

        nextStageElement.textContent =
            "🏆 Maximum bunny stage reached!";

    }

}



// ============================================
// 5. PROGRESS BAR
// ============================================

const progressFill =
    document.getElementById("progressFill");

const progressText =
    document.getElementById("progressText");


if (progressFill) {

    progressFill.style.width =
        Math.min(progress, 100) + "%";

}


if (progressText) {

    if (totalGamePoints < 500) {

        progressText.textContent =
            totalGamePoints +
            " / " +
            nextStagePoints;

    }

    else {

        progressText.textContent =
            totalGamePoints +
            " ⭐";

    }

}



// ============================================
// 6. REALISTIC BUNNY SIZE
// ============================================

const bunny =
    document.getElementById("rewardBunny");


if (bunny) {

    if (totalGamePoints < 50) {

        bunny.style.transform =
            "scale(0.78)";

    }

    else if (totalGamePoints < 150) {

        bunny.style.transform =
            "scale(0.86)";

    }

    else if (totalGamePoints < 300) {

        bunny.style.transform =
            "scale(0.94)";

    }

    else if (totalGamePoints < 500) {

        bunny.style.transform =
            "scale(1.02)";

    }

    else {

        bunny.style.transform =
            "scale(1.10)";

    }

}



// ============================================
// 7. BUNNY TALK
// ============================================

const speechBubble =
    document.getElementById("speechBubble");

const bunnyTalk =
    document.getElementById("bunnyTalk");


function updateBunnyMessage() {

    if (!speechBubble || !bunnyTalk) {
        return;
    }


    if (totalGamePoints === 0) {

        speechBubble.textContent =
            "Hi! 👋 Let's start learning together!";

        bunnyTalk.textContent =
            "Play games and help me grow! 🐰";

    }


    else if (totalGamePoints < 50) {

        speechBubble.textContent =
            "You're doing amazing! Keep playing! 💕";

        bunnyTalk.textContent =
            "I'm growing with you!";

    }


    else if (totalGamePoints < 150) {

        speechBubble.textContent =
            "Look! I've grown! 🎉";

        bunnyTalk.textContent =
            "Keep earning game points!";

    }


    else if (totalGamePoints < 300) {

        speechBubble.textContent =
            "Wow! I'm getting bigger! 🐰✨";

        bunnyTalk.textContent =
            "We're learning together!";

    }


    else if (totalGamePoints < 500) {

        speechBubble.textContent =
            "Amazing! Look how big I've become! 🌟";

        bunnyTalk.textContent =
            "You're an amazing learner!";

    }


    else {

        speechBubble.textContent =
            "I'm your Angel Bunny! 👼🐰";

        bunnyTalk.textContent =
            "We've learned so much together! ❤️";

    }

}


updateBunnyMessage();



// ============================================
// 8. BUNNY COLOUR
// ============================================

const bunnyImage =
    document.getElementById("bunnyImage");


let savedColour =
    localStorage.getItem("bunnyColour") || "white";


function changeBunnyColour(colour) {

    if (!bunnyImage) {
        return;
    }


    const bunnyImages = {

        white:
            "images/bunny-white.png",

        pink:
            "images/bunny-pink.png",

        blue:
            "images/bunny-blue.png",

        purple:
            "images/bunny-purple.png",

        green:
            "images/bunny-green.png",

        orange:
            "images/bunny-orange.png"

    };


    if (bunnyImages[colour]) {

        bunnyImage.src =
            bunnyImages[colour];

        localStorage.setItem(
            "bunnyColour",
            colour
        );

    }

}


changeBunnyColour(savedColour);



// ============================================
// 9. COLOUR UNLOCK LEVELS
// ============================================

const rewardItems =
    document.querySelectorAll(".reward-item");


rewardItems.forEach(function(item) {


    item.addEventListener(
        "click",
        function() {


            const type =
                item.dataset.type;


            const value =
                item.dataset.value;


            const cost =
                Number(item.dataset.cost) || 0;



            // =================================
            // CHECK POINTS
            // =================================

            if (totalGamePoints < cost) {

                alert(
                    "🔒 You need " +
                    cost +
                    " game points to unlock this item."
                );

                return;

            }



            // =================================
            // COLOUR
            // =================================

            if (type === "colour") {

                changeBunnyColour(value);


                // Remove selected
                document
                    .querySelectorAll(
                        '[data-type="colour"]'
                    )
                    .forEach(function(button) {

                        button.classList.remove(
                            "selected"
                        );

                    });


                // Select this colour
                item.classList.add(
                    "selected"
                );


                speechBubble.textContent =
                    "I love my new colour! 🎨🐰";

            }



            // =================================
            // CLOTHES
            // =================================

            if (type === "clothes") {

                item.classList.toggle(
                    "selected"
                );


                applyClothing(value);

            }

        }
    );

});



// ============================================
// 10. CLOTHING SYSTEM
// ============================================

function applyClothing(clothing) {

    const bunnyClothes =
        document.getElementById("bunnyClothes");

    const bunnyAccessory =
        document.getElementById("bunnyAccessory");


    if (!bunnyClothes || !bunnyAccessory) {
        return;
    }



    // =================================
    // T-SHIRT
    // =================================

    if (clothing === "shirt") {

        bunnyClothes.src =
            "images/bunny-shirt.png";

        speechBubble.textContent =
            "Look at my new T-shirt! 👕🐰";

    }



    // =================================
    // CAP
    // =================================

    else if (clothing === "cap") {

        bunnyAccessory.src =
            "images/bunny-cap.png";

        speechBubble.textContent =
            "Do you like my new cap? 🧢🐰";

    }



    // =================================
    // GLASSES
    // =================================

    else if (clothing === "glasses") {

        bunnyAccessory.src =
            "images/bunny-glasses.png";

        speechBubble.textContent =
            "Do I look smart? 👓🐰";

    }



    // =================================
    // CROWN
    // =================================

    else if (clothing === "crown") {

        bunnyAccessory.src =
            "images/bunny-crown.png";

        speechBubble.textContent =
            "I feel like a princess! 👑🐰";

    }



    // =================================
    // ANGEL WINGS
    // =================================

    else if (clothing === "wings") {

        bunnyAccessory.src =
            "images/bunny-wings.png";

        speechBubble.textContent =
            "Look! I can fly! 🪽🐰";

    }



    // =================================
    // GRADUATION
    // =================================

    else if (clothing === "graduation") {

        bunnyClothes.src =
            "images/bunny-graduation.png";

        speechBubble.textContent =
            "We did it! 🎓🐰";

    }

}



// ============================================
// 11. SAVE CLOTHING SELECTION
// ============================================

const savedClothing =
    localStorage.getItem("bunnyClothing");


if (savedClothing) {

    applyClothing(savedClothing);

}



// ============================================
// 12. CLICK CLOTHING AND SAVE IT
// ============================================

rewardItems.forEach(function(item) {

    if (item.dataset.type !== "clothes") {
        return;
    }


    item.addEventListener(
        "click",
        function() {

            const clothing =
                item.dataset.value;


            localStorage.setItem(
                "bunnyClothing",
                clothing
            );

        }
    );

});



// ============================================
// 13. BUNNY HELLO ANIMATION
// ============================================

setTimeout(function() {

    if (!bunny) {
        return;
    }


    bunny.classList.add(
        "bunny-happy"
    );


    setTimeout(function() {

        bunny.classList.remove(
            "bunny-happy"
        );

    }, 1000);

}, 1500);



// ============================================
// 14. BUNNY JUMP
// ============================================

function bunnyJump() {

    const bunny =
        document.getElementById("rewardBunny");

    if (!bunny) {
        return;
    }


    bunny.classList.remove(
        "bunny-jump"
    );


    // Restart animation
    void bunny.offsetWidth;


    bunny.classList.add(
        "bunny-jump"
    );


    // Return to normal idle animation
    setTimeout(function() {

        bunny.classList.remove(
            "bunny-jump"
        );

    }, 800);

}