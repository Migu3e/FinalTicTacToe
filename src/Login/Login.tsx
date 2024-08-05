import X0pic from '../assets/react.svg';
import './Login.css';
import { useLoginLogic } from './LoginLogic';

function Login() {
    const {
        name,
        error,
        handleTextBoxNameChange,
        handleSubmit,
        navigate
    } = useLoginLogic();

    return (
        <div className="login-container">
            <div className="login-card">
                <img className="login-card-image" src={X0pic} alt="TicTacImg"/>
                <h2 className="login-card-title">TicTacToe</h2>
                <p className="login-card-text">Login to play</p>

                <form onSubmit={handleSubmit}>
                    <div className="login-text-input">
                        <input
                            value={name}
                            onChange={handleTextBoxNameChange}
                            placeholder="Enter your name"
                        />
                    </div>

                    <div>
                        <button type="submit" className="login-button">היכנס</button>
                    </div>
                </form>

                <div className="error-container">
                    <p className={`error-message ${error ? 'visible' : ''} ${error.startsWith('Welcome back') ? "success" : ""}`}>
                        {error}
                    </p>
                </div>

                <div>
                    <h6 className="register-prompt">לא רשום?</h6>
                    <button className="register-button" onClick={() => navigate('/register')}>הירשם</button>
                </div>
            </div>
        </div>
    );
}

export default Login;