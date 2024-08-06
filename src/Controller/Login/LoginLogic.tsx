import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from "../../services/Utilities/useLocalStorage.tsx";
import { Player } from '../../Model/Player.tsx';
import { useName } from '../../services/stores/NameSave.tsx';

export function LoginLogic() {
    const [name, setName] = useState("");
    const [players] = useLocalStorage("players", []);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { setCurrentPlayer } = useName();

    function handleTextBoxNameChange(event: ChangeEvent<HTMLInputElement>): void {
        setName(event.target.value);
        setError("");
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        if (name.trim() === "") 
        {
            setError("Please enter a name.");
            return;
        }

        const player: Player | undefined = players.find(p => p.name.toLowerCase() === name.toLowerCase());

        if (player) {
            setName("");
            setCurrentPlayer(player);
            navigate('/menu');
        } else {
            setError("Player not found. Please register first.");
        }
    }

    return {
        name,
        error,
        handleTextBoxNameChange,
        handleSubmit,
        navigate
    };
}