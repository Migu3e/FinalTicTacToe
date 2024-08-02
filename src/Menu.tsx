import './CSS/Menu.css';
import { Player } from './useLocalStorage';


type MenuPageProps = {
    onLogout: () => void;
    currentPlayer: Player | null;

};

function MenuPage({ onLogout,currentPlayer  }: MenuPageProps) {


    return (

        <div>
            <div>
                {currentPlayer && (
                    <>
                        <span>Name: {currentPlayer.name}</span>
                        <span>Score: {currentPlayer.score}</span>
                    </>
                )}
            </div>
            <div>
                <button onClick={onLogout}>Logout</button>
            </div>

        </div>
    );
}

export default MenuPage;