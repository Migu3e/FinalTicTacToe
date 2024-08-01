import X0pic from './assets/img.png';
import './CSS/Register.css';

function Card() {
    return (
        <div className="card-container">
            <div className="card">
                <img className="card-image" src={X0pic} alt="TicTacImg"/>
                <h2 className="card-title">TicTacToe</h2>
                <p className="card-text">Best TicTacToe</p>

                <div></div>

                <div>
                    <button className="card-register">הירשם</button>
                </div>

                <div>
                    <h6 className="card-registered">כבר רשום?</h6>
                    <button>היכנס</button>
                </div>
            </div>
        </div>
    );
}

export default Card;