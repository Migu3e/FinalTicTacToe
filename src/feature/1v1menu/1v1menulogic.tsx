import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage, { Player } from "../../services/Utilities/useLocalStorage.tsx";

export function use1v1MenuLogic() {
    const [player1Name, setPlayer1Name] = useState("");
    const [player2Name, setPlayer2Name] = useState("");
    const [players] = useLocalStorage("players", [] as Player[]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

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
        navigate('/1v1');
    }

    return {player1Name, player2Name, error, setPlayer1Name, setPlayer2Name, handleNameChange, handleSubmit
    };
}