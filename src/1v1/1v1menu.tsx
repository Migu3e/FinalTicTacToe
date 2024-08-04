import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage, { Player } from "../useLocalStorage";
import { useName } from '../NameSave';
import './1v1menu.css';
import X0pic from "../assets/react.svg";

function OneVOneMenu() {
    const [player1Name, setPlayer1Name] = useState("");
    const [player2Name, setPlayer2Name] = useState("");
    const [players] = useLocalStorage("players", [] as Player[]);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { setCurrentPlayer } = useName();

    function handleNameChange(event: ChangeEvent<HTMLInputElement>, setName: React.Dispatch<React.SetStateAction<string>>) {
        setName(event.target.value);
        setError("");
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        if (player1Name.trim() === "" || player2Name.trim() === "") {
            setError("Please enter names for both players.");
            return;
        }

        if (player1Name.toLowerCase() === player2Name.toLowerCase()) {
            setError("Player names must be different.");
            return;
        }

        const player1 = players.find(p => p.name.toLowerCase() === player1Name.toLowerCase());
        const player2 = players.find(p => p.name.toLowerCase() === player2Name.toLowerCase());

        if (!player1 || !player2) {
            setError("One or both players not found. Please check the names and try again.");
            return;
        }

        localStorage.setItem('1v1Players', JSON.stringify({ player1: player1.name, player2: player2.name }));
        setCurrentPlayer(player1);
        navigate('/1v1');
    }

    return (
        <div className="onevone-container">
            <div className="onevone-card">
                <img className="login-card-image" src={X0pic} alt="TicTacImg"/>

                <h2 className="onevone-card-title">1v1 TicTacToe</h2>
                <p className="onevone-card-text">Enter player names to start</p>

                <form onSubmit={handleSubmit}>
                    <div className="onevone-text-input">
                        <input
                            value={player1Name}
                            onChange={(e) => handleNameChange(e, setPlayer1Name)}
                            placeholder="Player 1 name"
                        />
                    </div>
                    <div className="onevone-text-input">
                        <input
                            value={player2Name}
                            onChange={(e) => handleNameChange(e, setPlayer2Name)}
                            placeholder="Player 2 name"
                        />
                    </div>

                    <div>
                        <button type="submit" className="onevone-button">Start Game</button>
                    </div>
                </form>

                <div className="onevone-error-container">
                    <p className={`onevone-error-message ${error ? 'visible' : ''}`}>
                        {error}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default OneVOneMenu;