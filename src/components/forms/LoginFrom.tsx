import '../../assets/CSS/Login/Login.css';
import { LoginLogic } from '../../Controller/Login/LoginLogic.tsx';

function LoginForm() {
    const {
        name,
        handleTextBoxNameChange,
        handleSubmit,
        error
    } = LoginLogic();

    return (

        <>
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
                <p className={`error-message ${error ? 'visible' : ''} ${error === "נרשמת בהצלחה" ? "success" : ""}`}>
                    {error}
                </p>
            </div>
        </>

    )
        ;
}


export default LoginForm;