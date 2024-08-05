import X0pic from '../assets/react.svg';
import './Register.css';
import { RegisterLogic } from './RegisterLogic';

function Register() {
    const {
        name,
        error,
        handleTextBoxNameChange,
        handleSubmit,
        navigate
    } = RegisterLogic();

    return (
        <div className="card-container">
            <div className="card">
                <img className="card-image" src={X0pic} alt="TicTacImg"/>
                <h2 className="card-title">TicTacToe</h2>
                <p className="card-text">Best TicTacToe</p>

                <form onSubmit={handleSubmit}>
                    <div className="text-input">
                        <input
                            value={name}
                            onChange={handleTextBoxNameChange}
                            placeholder="Enter your name"
                        />
                    </div>

                    <div>
                        <button type="submit" className="card-register">הירשם</button>
                    </div>
                </form>

                <div className="error-container">
                    <p className={`error-message ${error ? 'visible' : ''} ${error === "נרשמת בהצלחה" ? "success" : ""}`}>
                        {error}
                    </p>
                </div>

                <div>
                    <h6 className="card-registered">כבר רשום?</h6>
                    <button className="card-login" onClick={() => navigate('/')}>היכנס</button>
                </div>
            </div>
        </div>
    );
}

export default Register;