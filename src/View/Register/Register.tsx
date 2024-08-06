import X0pic from '../../assets/react.svg';
import '../../assets/CSS/Register/Register.css';
import { RegisterLogic } from '../../Controller/Register/RegisterLogic.tsx';
import RegisterFrom  from '../../components/forms/RegisterFrom.tsx';


function Register() {
    const {
        navigate
    } = RegisterLogic();

    return (
        <div className="card-container">
            <div className="card">
                <img className="card-image" src={X0pic} alt="TicTacImg"/>
                <h2 className="card-title">TicTacToe</h2>
                <p className="card-text">Best TicTacToe</p>

               <RegisterFrom/>

               
                <div>
                    <h6 className="card-registered">כבר רשום?</h6>
                    <button className="card-login" onClick={() => navigate('/')}>היכנס</button>
                </div>
            </div>
        </div>
    );
}

export default Register;