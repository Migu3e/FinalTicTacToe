import { useState, ChangeEvent, FormEvent } from "react";
import useLocalStorage, { Player } from "../useLocalStorage";
import { useNavigate } from 'react-router-dom';

export function RegisterLogic() {
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [players, setPlayers] = useLocalStorage("players", [] as Player[]);
    const navigate = useNavigate();

    function handleTextBoxNameChange(event: ChangeEvent<HTMLInputElement>): void {
        setName(event.target.value);
        setError("");
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        if (name.trim() === "") {
            setError("חובה להכניס שם");
            return;
        }

        const playerExists: boolean = players.some(player => player.name.toLowerCase() === name.toLowerCase());

        if (playerExists) {
            setError("המשתמש כבר רשום לצערנו");
            return;
        }

        const newPlayer: Player = { name: name.trim(), score: 0 };
        const updatedPlayers: Player[] = [...players, newPlayer];

        setPlayers(updatedPlayers);

        setName("");
        setError("משתמש נרשם בהצלחה רבה מאוד");
        // loginnigaa
    }

    return {
        name,
        error,
        handleTextBoxNameChange,
        handleSubmit,
        navigate
    };
}