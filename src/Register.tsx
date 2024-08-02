import X0pic from './assets/react.svg'
import './CSS/Register.css';
import { useState, ChangeEvent, FormEvent } from "react";
import useLocalStorage, { Player } from "./useLocalStorage";



interface RegisterProps {
    onSwitchToLogin: () => void;
    onRegistered: () => void;
}


function Register({ onSwitchToLogin,onRegistered }: RegisterProps) {
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [players, setPlayers] = useLocalStorage("players", [] as Player[]);

    function handleTextBoxNameChange(event: ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
        setError("");
    }
    function timeout(delay: number) {
        return new Promise( res => setTimeout(res, delay) );
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
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


        const updatedPlayers = [...players, newPlayer];
        console.log("Updated players:", updatedPlayers); // Debug log


        setPlayers([...players, newPlayer]);

        setName("");
        setError("משתמש נרשם בהצלחה רבה מאוד");
        await timeout(1000); //for 1 sec delay becuse it wont register if it dosent do it

        onRegistered();
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

export default Register;