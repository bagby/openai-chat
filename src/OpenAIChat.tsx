import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

const OpenAIChat: React.FC = () => {
    const [input, setInput] = useState<string>('');
    const [response, setResponse] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await axios.post(
                'https://api.openai.com/v1/engines/davinci-codex/completions',
                {
                    prompt: input,
                    max_tokens: 150,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`,
                    },
                }
            );
            setResponse(result.data.choices[0].text);
        } catch (error) {
            console.error('Error fetching data from OpenAI API:', error);
            setResponse('Error fetching data from OpenAI API');
        }
        setLoading(false);
    };

    return (
        <div>
            <h1>OpenAI Chat</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Type your prompt here..."
                    rows={4}
                    cols={50}
                />
                <br />
                <button type="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Submit'}
                </button>
            </form>
            {response && (
                <div>
                    <h2>Response:</h2>
                    <p>{response}</p>
                </div>
            )}
        </div>
    );
};

export default OpenAIChat;