import React from 'react';
import './App.css';
import OpenAIChat from './OpenAIChat';

const App: React.FC = () => {
    return (
        <div className="App">
            <header className="App-header">
                <OpenAIChat />
            </header>
        </div>
    );
};

export default App;