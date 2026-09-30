const OpenAI = require("openai");

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

module.exports = async function handler(req, res) {

    // Only allow POST requests
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    try {

        const { question } = req.body;

        // Check that the student actually sent a question
        if (!question || question.trim() === "") {
            return res.status(400).json({
                error: "Please enter a homework question."
            });
        }

        // Send the question to OpenAI
        const response = await client.responses.create({
            model: "gpt-5",
            instructions:
                "You are a friendly homework helper for children. " +
                "Explain answers in simple, age-appropriate language. " +
                "Show the steps when appropriate. " +
                "Help the student understand the topic instead of only giving a final answer.",
            input: question
        });

        return res.status(200).json({
            answer: response.output_text
        });

    } catch (error) {

        console.error("OpenAI error:", error);

        return res.status(500).json({
            error: "Sorry, something went wrong while getting the AI answer."
        });
    }
};
// ================================
// HOMEWORK AI SEARCH
// ================================

const askAIButton = document.getElementById("askAIButton");
const homeworkQuestion = document.getElementById("homeworkQuestion");
const aiAnswer = document.getElementById("aiAnswer");

if (askAIButton) {

    askAIButton.addEventListener("click", async function () {

        // Get the question
        const question = homeworkQuestion.value.trim();

        // Check if the child entered a question
        if (question === "") {
            aiAnswer.innerHTML = `
                <h3>🤖 AI Answer</h3>
                <p>❗ Please type a homework question first.</p>
            `;
            return;
        }

        // Show loading message
        aiAnswer.innerHTML = `
            <h3>🤖 AI Answer</h3>
            <p>🔎 Searching for an answer...</p>
        `;

        try {

            // Send the question to the Vercel backend
            const response = await fetch("/api/homework", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    question: question
                })
            });

            // Get the response from the backend
            const data = await response.json();

            // Check if the backend returned an error
            if (!response.ok) {
                throw new Error(data.error || "Something went wrong.");
            }

            // Display the AI answer
            aiAnswer.innerHTML = `
                <h3>🤖 AI Answer</h3>
                <p>${data.answer}</p>
            `;

        } catch (error) {

            console.error("AI Homework Error:", error);

            aiAnswer.innerHTML = `
                <h3>🤖 AI Answer</h3>
                <p>❌ Sorry, we could not get an answer right now.</p>
                <p>${error.message}</p>
            `;
        }

    });

};  