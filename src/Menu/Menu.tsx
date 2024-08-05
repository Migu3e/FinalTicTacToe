import './Menu.css';
import { useName } from '../NameSave';
import ActionBar from '../NavActBar.tsx';
import {useNavigationHelpers} from "../UseFunctions.ts";

function MenuPage() {
    const { currentPlayer } = useName();
    const { handleLogout ,handleOptionClick} = useNavigationHelpers();


    if (!currentPlayer) {
        handleLogout();
        return null;
    }

    return (
        <div className="game-container">
          <ActionBar></ActionBar>

            <div className="menu-options">
                <button className="menu-button primary" onClick={() => handleOptionClick('1v1menu')}>
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