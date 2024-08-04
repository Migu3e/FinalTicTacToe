// src/navigationHelpers.ts
import { useNavigate } from "react-router-dom";
import { useName } from "./NameSave";

export function useNavigationHelpers() {
    const navigate = useNavigate();
    const {setCurrentPlayer } = useName();

    const handleLogout = () => {
        setCurrentPlayer(null);
        navigate('/');
    };

    const handleBack = () => {
        navigate('/menu');
    };
    const handleOptionClick = (option: '1v1' | 'scoreboard' | '1vPC') => {
        navigate(`/${option}`);
    };

    return { handleLogout, handleBack,handleOptionClick };
}
