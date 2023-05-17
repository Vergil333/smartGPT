import {OpenAIApi, CreateCompletionRequest, Configuration} from "openai";

let openai: OpenAIApi | null = null;

const model = "text-davinci-003"
const max_tokens = 2000
const temperature = 0.5

function initialize(apiKey: string) {
    openai = new OpenAIApi(new Configuration({apiKey}));
}

async function getAnswers(prompt: string): Promise<string[]> {
    if (!openai) {
        throw new Error("OpenAI not initialized");
    }

    const request: CreateCompletionRequest = {
        prompt,
        model,
        max_tokens,
        temperature,
        n: 3,
    };

    const result = await openai.createCompletion(request);
    return result.data.choices.map(choice => choice.text.trim());
}

async function reflect(prompt: string): Promise<string> {
    if (!openai) {
        throw new Error("OpenAI not initialized");
    }

    const request: CreateCompletionRequest = {
        prompt,
        model,
        max_tokens,
        temperature,
        n: 1,
    };

    const result = await openai.createCompletion(request);
    return result.data.choices[0]?.text.trim() || "";
}

async function resolve(prompt: string): Promise<string> {
    if (!openai) {
        throw new Error("OpenAI not initialized");
    }

    const request: CreateCompletionRequest = {
        prompt,
        model,
        max_tokens,
        temperature,
        n: 1,
    };

    const result = await openai.createCompletion(request);
    return result.data.choices[0]?.text.trim() || "";
}

export const OpenaiService = {
    initialize,
    getAnswers,
    reflect,
    resolve,
}