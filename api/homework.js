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