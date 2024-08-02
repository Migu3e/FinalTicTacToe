import './CSS/Menu.css';
import { Player } from './useLocalStorage';

type MenuPageProps = {
    onLogout: () => void;
    currentPlayer: Player | null;
    onOptionClick: (option: '1v1' | 'scoreboard' | '1vPC') => void;
};

function MenuPage({ onLogout, currentPlayer, onOptionClick }: MenuPageProps) {
    return (
        <div className="menu-container">
            <div className="action-bar">
                <div className="player-info">
                    {currentPlayer && (
                        <>
                            <span>Player: {currentPlayer.name}</span>
                            <span>Score: {currentPlayer.score}</span>
                        </>
                    )}
                </div>
                <div className="logout-button-container">
                    <button className="logout-button" onClick={onLogout}>Logout</button>
                </div>
            </div>

            <div className="menu-options">
                <button className="menu-button primary" onClick={() => onOptionClick('1v1')}>1v1</button>
                <button className="menu-button accent" onClick={() => onOptionClick('scoreboard')}>Scoreboard</button>
                <button className="menu-button primary" onClick={() => onOptionClick('1vPC')}>1vPC</button>
            </div>
        </div>
    );
}

export default MenuPage;
