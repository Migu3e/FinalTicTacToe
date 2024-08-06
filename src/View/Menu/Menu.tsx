import '../../assets/CSS/menu/Menu.css';
import { useName } from '../../services/stores/NameSave.tsx';
import ActionBar from '../../components/navigation/NavActBar.tsx';
import {useNavigationHelpers} from "../../services/Utilities/UseFunctions.ts";
import Menu1vScoreboardButton from "../../components/buttons/MenuBottonsScoreboard.tsx";
import Menu1vPCButton from "../../components/buttons/MenuButton1vpc.tsx";
import Menu1v1Button from "../../components/buttons/MenuButton1v1.tsx";


function MenuPage() {
    const { currentPlayer } = useName();
    const { handleLogout } = useNavigationHelpers();


    if (!currentPlayer) {
        handleLogout();
        return null;
    }

    return (
        <div className="game-container">
          <ActionBar/>

            <div className="menu-options">
                <Menu1v1Button/>
                <Menu1vScoreboardButton/>
                <Menu1vPCButton/>
                
            </div>
        </div>
    );
}

export default MenuPage;