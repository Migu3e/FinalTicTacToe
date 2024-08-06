import X0pic from '../../assets/react.svg';
import '../../assets/CSS/Login/Login.css';
import { LoginLogic } from '../../feature/Login/LoginLogic.tsx';
import LoginForm  from '../../components/forms/LoginFrom.tsx';


function Login() {
    const {
        navigate,
    } = LoginLogic();
    
    return (
        <div className="login-container">
            <div className="login-card">
                <img className="login-card-image" src={X0pic} alt="TicTacImg"/>
                <h2 className="login-card-title">TicTacToe</h2>
                <p className="login-card-text">Login to play</p>

                <LoginForm/>

                <div>
                    <h6 className="register-prompt">לא רשום?</h6>
                    <button className="register-button" onClick={() => navigate('/register')}>הירשם</button>
                </div>
            </div>
        </div>
    );
}

export default Login;