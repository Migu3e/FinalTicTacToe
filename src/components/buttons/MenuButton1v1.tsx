import '../../assets/CSS/menu/Menu.css';
import { useName } from '../../services/stores/NameSave.tsx';
import {useNavigationHelpers} from "../../services/Utilities/UseFunctions.ts";

function Menu1v1Button() {
    const { currentPlayer } = useName();
    const { handleLogout ,handleOptionClick} = useNavigationHelpers();


    if (!currentPlayer) {
        handleLogout();
        return null;
    }

    return (
        <button className="menu-button primary" onClick={() => handleOptionClick('1v1menu')}>
            <span>1v1</span>
            <span>play 1v1 with the friends you dont have.</span>
        </button>
    );
}

export default Menu1v1Button;