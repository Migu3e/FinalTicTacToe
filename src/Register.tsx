import X0pic from './assets/react.svg'
import './CSS/Register.css';
import { useState, ChangeEvent, FormEvent } from "react";
import useLocalStorage, { Player } from "./useLocalStorage";



interface RegisterProps {
    onSwitchToLogin: () => void;
}


function Card({ onSwitchToLogin }: RegisterProps) {
    const [name, setName] = useState("");
    const [players, setPlayers] = useLocalStorage("players", [] as Player[]);
    const [error, setError] = useState("");

    function handleTextBoxNameChange(event: ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
        setError("");
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (name.trim() === "") {
            setError("חובה להכניס שם");
            return;
        }

        const playerExists : boolean = players.some(player => player.name.toLowerCase() === name.toLowerCase());

        if (playerExists) {
            setError("המשתמש כבר רשום לצערנו");
            return;
        }

        const newPlayer: Player = { name: name.trim(), score: 0 };
        setPlayers([...players, newPlayer]);
        setName("");
        setError("משתמש נרשם בהצלחה רבה מאוד");
    }

    return (
        <div className="card-container">
            <div className="card">
                <img className="card-image" src={X0pic} alt="TicTacImg"/>
                <h2 className="card-title">TicTacToe</h2>
                <p className="card-text">Best TicTacToe</p>

                <form onSubmit={handleSubmit}>
                    <div className="text-input">
                        <input
                            value={name}
                            onChange={handleTextBoxNameChange}
                            placeholder="Enter your name"
                        />
                    </div>

                    <div>
                        <button type="submit" className="card-register">הירשם</button>
                    </div>
                </form>

                <div className="error-container">
                    <p className={`error-message ${error ? 'visible' : ''} ${error === "נרשמת בהצלחה" ? "success" : ""}`}>
                        {error}
                    </p>
                </div>

                <div>
                    <h6 className="card-registered">כבר רשום?</h6>
                    <button className="card-login" onClick={onSwitchToLogin}>היכנס</button>
                </div>
            </div>
        </div>
    );
}

export default Card;