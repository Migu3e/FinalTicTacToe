import '../../assets/CSS/menu/Menu.css';
import { useName } from '../../services/stores/NameSave.tsx';
import {useNavigationHelpers} from "../../services/Utilities/UseFunctions.ts";

function Menu1vPCButton() {
    const { currentPlayer } = useName();
    const { handleLogout ,handleOptionClick} = useNavigationHelpers();


    if (!currentPlayer) {
        handleLogout();
        return null;
    }

    return (
        <button className="menu-button secondary" onClick={() => handleOptionClick('1vPC')}>
            <span>1vPC</span>
            <span>if you want to lose</span>
        </button>
    );
}

export default Menu1vPCButton;