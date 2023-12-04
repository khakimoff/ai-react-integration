import { HistoryItem, MessagesItem } from "../App";

export const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

export type OpenAIRequestHandler = (
    input: string | number,
    messages: MessagesItem[],
    setMessages: React.Dispatch<React.SetStateAction<MessagesItem[]>>,
    setHistory: React.Dispatch<React.SetStateAction<HistoryItem[]>>,
    setInput: React.Dispatch<React.SetStateAction<string | number>>,
    setIsLoadingAnswer: React.Dispatch<React.SetStateAction<boolean>>
) => Promise<void>;

const handleOpenAIRequest: OpenAIRequestHandler = async (input, messages, setMessages, setHistory, setInput, serIsLoadAnswer) => {
    const prompt = {
        role: "user",
        content: input,
    };
    setMessages([...messages, prompt]);
    setInput("");
    serIsLoadAnswer(true);

    try {
        const response = await fetch(OPENAI_API_URL, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_APP_OPENAI_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [...messages, prompt],
            }),
        });

        const data = await response.json();

        const res = data.choices[0].message.content;
        setMessages((messages: MessagesItem[]) => [
            ...messages,
            {
                role: "assistant",
                content: res,
            },
        ]);

        setHistory((history) => [...history, { question: input, answer: res }] as HistoryItem[]);
        serIsLoadAnswer(false);

    } catch (error) {
        console.error("Error during OpenAI request:", error);
    }
};

export default handleOpenAIRequest;
