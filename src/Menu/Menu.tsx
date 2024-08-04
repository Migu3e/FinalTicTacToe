import './Menu.css';
import { useName } from '../NameSave';
import {useNavigationHelpers} from "../UseFunctions.ts";

function MenuPage() {
    const { currentPlayer } = useName();
    const { handleLogout, handleBack ,handleOptionClick} = useNavigationHelpers();


    if (!currentPlayer) {
        handleLogout();
        return null;
    }

    return (
        <div className="game-container">
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

            <div className="menu-options">
                <button className="menu-button primary" onClick={() => handleOptionClick('1v1')}>
                    <span>1v1</span>
                    <span>play 1v1 with the friends you dont have.</span>
                </button>
                <button className="menu-button accent" onClick={() => handleOptionClick('scoreboard')}>
                    <span>ScoreBoard</span>
                    <span>to see how bad you are</span>
                </button>
                <button className="menu-button secondary" onClick={() => handleOptionClick('1vPC')}>
                    <span>1vPC</span>
                    <span>if you want to lose</span>
                </button>
            </div>
        </div>
    );
}

export default MenuPage;