import '../../assets/CSS/Register/Register.css';
import { RegisterLogic } from '../../Controller/Register/RegisterLogic.tsx';


function RegisterForm() {
    const {
        name,
        handleTextBoxNameChange,
        handleSubmit,
        error
    } = RegisterLogic();

    return (
        <>
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

        </>

    );
}

export default RegisterForm;