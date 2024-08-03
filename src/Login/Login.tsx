import { useState, ChangeEvent, FormEvent } from 'react';
import X0pic from '../assets/react.svg';
import './Login.css';
import useLocalStorage, { Player } from "../useLocalStorage.tsx";

interface LoginProps {
    onSwitchToRegister: () => void;
    onLoggedIn: (player: Player) => void;
    getCurrentPlayer: () => Player | null;

}

function Login({ onSwitchToRegister,onLoggedIn }: LoginProps) {
    const [name, setName] = useState("");
    const [players] = useLocalStorage("players", [] as Player[]);
    const [error, setError] = useState("");

    function handleTextBoxNameChange(event: ChangeEvent<HTMLInputElement>) : void {
        setName(event.target.value);
        setError("");
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        if (name.trim() === "") {
            setError("Please enter a name.");
            return;
        }

        const player :Player | undefined = players.find(p => p.name.toLowerCase() === name.toLowerCase());

        if (player) {
            setName("");
            onLoggedIn(player);
        } else {
            setError("Player not found. Please register first.");
        }
    }

    return (
        <div className="login-container">
            <div className="login-card">
                <img className="login-card-image" src={X0pic} alt="TicTacImg"/>
                <h2 className="login-card-title">TicTacToe</h2>
                <p className="login-card-text">Login to play</p>

                <form onSubmit={handleSubmit}>
                    <div className="login-text-input">
                        <input
                            value={name}
                            onChange={handleTextBoxNameChange}
                            placeholder="Enter your name"
                        />
                    </div>

                    <div>
                        <button type="submit" className="login-button">היכנס</button>
                    </div>
                </form>

                <div className="error-container">
                    <p className={`error-message ${error ? 'visible' : ''} ${error.startsWith('Welcome back') ? "success" : ""}`}>
                        {error}
                    </p>
                </div>

                <div>
                    <h6 className="register-prompt">לא רשום?</h6>
                    <button className="register-button" onClick={onSwitchToRegister}>הירשם</button>
                </div>
            </div>
        </div>
    );
}

export default Login;