import './Menu/Menu.css';
import { useName } from './NameSave.tsx';
import {useNavigationHelpers} from "./UseFunctions.ts";

function ActionBar() {
    const { currentPlayer } = useName();
    const { handleLogout, handleBack} = useNavigationHelpers();


    if (!currentPlayer) {
        handleLogout();
        return null;
    }

    return (
            <div className="action-bar">
                <div className="logout-button-container">
                    <button className="back-button" onClick={handleBack}>Back</button>
                </div>
                <div className="player-info">
                    <span>Player: {currentPlayer.name}</span>
                    <span>Score: {currentPlayer.score}</span>
                </div>
                <div className="logout-button-container">
                    <button className="logout-button" onClick={handleLogout}>Logout</button>
                </div>
            </div>
    );
}

export default ActionBar;