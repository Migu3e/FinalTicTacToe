import './Menu.css';
import { Player } from '../useLocalStorage.tsx';

type MenuPageProps = {
    onLogout: () => void;
    currentPlayer: Player | null;
    onOptionClick: (option: '1v1' | 'scoreboard' | '1vPC') => void;
    onBack: () => void;

};

function MenuPage({ onLogout, currentPlayer, onOptionClick,onBack }: MenuPageProps) {
    return (
        <div className="game-container">
            <div className="action-bar">
                <div className="logout-button-container">
                    <button className="back-button" onClick={onBack}>Back</button>
                </div>
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
                <button className="menu-button primary" onClick={() => onOptionClick('1v1')}>
                    <span>1v1</span>
                    <span>play 1v1 with the friends you dont have.</span>
                </button>
                <button className="menu-button accent" onClick={() => onOptionClick('scoreboard')}>
                    <span>ScoreBoard</span>
                    <span>to see how bad you are</span>
                </button>
                <button className="menu-button secondary" onClick={() => onOptionClick('1vPC')}>
                    <span>1vPC</span>
                    <span>if you want to lose</span>
                </button>
            </div>
        </div>
    );
}

export default MenuPage;