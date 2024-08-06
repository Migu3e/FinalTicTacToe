import '../../assets/CSS/menu/Menu.css';
import {useNavigationHelpers} from "../../services/Utilities/UseFunctions.ts";

function Menu1vScoreboardButton() {
    const {handleOptionClick} = useNavigationHelpers();


    return (
        <button className="menu-button accent" onClick={() => handleOptionClick('scoreboard')}>
            <span>ScoreBoard</span>
            <span>to see how bad you are</span>
        </button>
    );
}

export default Menu1vScoreboardButton;