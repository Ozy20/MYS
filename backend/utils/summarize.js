const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { PromptTemplate } = require("@langchain/core/prompts");
const { StringOutputParser } = require("@langchain/core/output_parsers");
require('dotenv').config();

const generateReportSummary = async (content) => {
    try {
        const apiKey = process.env.GOOGLE_API_KEY;
        if (!apiKey) {
            throw new Error("GOOGLE_API_KEY is missing in environment variables");
        }

        // Initialize model lazily
        const model = new ChatGoogleGenerativeAI({
            apiKey: apiKey,
            modelName: "gemini-1.5-flash",
            temperature: 0,
        });

        const template = `
      You are an expert document analyst. Summarize the following report: {content}
    `;

        const prompt = PromptTemplate.fromTemplate(template);

        // 3. Create the Chain (Prompt -> Model -> Parse to String)
        const chain = prompt.pipe(model).pipe(new StringOutputParser());

        // 4. Execute
        const result = await chain.invoke({
            content: content,
        });

        return result;
    } catch (error) {
        console.error("AI Summarization Error Details:", JSON.stringify(error, null, 2));
        throw new Error(`Failed to generate summary: ${error.message || error}`);
    }
};

module.exports = { generateReportSummary };