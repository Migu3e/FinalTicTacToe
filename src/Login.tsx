import { useState, ChangeEvent, FormEvent } from 'react';
import X0pic from './assets/react.svg';
import './CSS/Login.css';
import useLocalStorage, { Player } from "./useLocalStorage";

interface LoginProps {
    onSwitchToRegister: () => void;
}

function Login({ onSwitchToRegister }: LoginProps) {
    const [name, setName] = useState("");
    const [players] = useLocalStorage("players", [] as Player[]);
    const [error, setError] = useState("");

    function handleTextBoxNameChange(event: ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
        setError("");
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (name.trim() === "") {
            setError("Please enter a name.");
            return;
        }

        const player = players.find(p => p.name.toLowerCase() === name.toLowerCase());

        if (player) {
            setError(`Welcome back, ${player.name}! Your score is ${player.score}.`);
            setName("");
        } else {
            setError("Player not found. Please register first.");
        }
    }

    return (
        <div className="card-container">
            <div className="card">
                <img className="card-image" src={X0pic} alt="TicTacImg"/>
                <h2 className="card-title">TicTacToe</h2>
                <p className="card-text">Login to play</p>

                <form onSubmit={handleSubmit}>
                    <div className="text-input">
                        <input
                            value={name}
                            onChange={handleTextBoxNameChange}
                            placeholder="Enter your name"
                        />
                    </div>

                    <div>
                        <button type="submit" className="card-login">היכנס</button>
                    </div>
                </form>

                <div className="error-container">
                    <p className={`error-message ${error ? 'visible' : ''} ${error.startsWith('Welcome back') ? "success" : ""}`}>
                        {error}
                    </p>
                </div>

                <div>
                    <h6 className="card-register-prompt">לא רשום?</h6>
                    <button className="card-register" onClick={onSwitchToRegister}>הירשם</button>
                </div>
            </div>
        </div>
    );
}

export default Login;