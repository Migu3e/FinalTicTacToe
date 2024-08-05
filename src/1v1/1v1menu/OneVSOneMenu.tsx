import ActionBar from '../../NavActBar.tsx';
import '../1v1menu.css';
import X0pic from "../../assets/react.svg";
import { use1v1MenuLogic } from './1v1menulogic.tsx';

function OneVSOneMenu() {
    const {player1Name, player2Name, error, setPlayer1Name, setPlayer2Name, handleNameChange, handleSubmit} = use1v1MenuLogic();

    return (
        <div>
            <ActionBar />
            <div className="onevone-container">
                <div className="onevone-card">
                    <img className="login-card-image" src={X0pic} alt="TicTacImg"/>

                    <h2 className="onevone-card-title">1v1 TicTacToe</h2>
                    <p className="onevone-card-text">Enter player names to start</p>

                    <form onSubmit={handleSubmit}>
                        <div className="onevone-text-input">
                            <input
                                value={player1Name}
                                onChange={(e) => handleNameChange(e, setPlayer1Name)}
                                placeholder="Player 1 name"
                            />
                        </div>
                        <div className="onevone-text-input">
                            <input
                                value={player2Name}
                                onChange={(e) => handleNameChange(e, setPlayer2Name)}
                                placeholder="Player 2 name"
                            />
                        </div>

                        <div>
                            <button type="submit" className="onevone-button">Start Game</button>
                        </div>
                    </form>

                    <div className="onevone-error-container">
                        <p className={`onevone-error-message ${error ? 'visible' : ''}`}>
                            {error}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default OneVSOneMenu;