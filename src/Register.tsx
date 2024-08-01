import X0pic from './assets/react.svg'
import './CSS/Register.css';
import { useState, ChangeEvent } from "react";


function Card()
{
    const [name, setName] = useState("");

    function handleNameChange(event: ChangeEvent<HTMLInputElement>)
    {
        setName(event.target.value);
    }

    return (
        <div className="card-container">
            <div className="card">
                <img className="card-image" src={X0pic} alt="TicTacImg"/>
                <h2 className="card-title">TicTacToe</h2>
                <p className="card-text">Best TicTacToe</p>

                <div className="text-input">
                    <input value={name} onChange={handleNameChange}/>
                </div>

                <div>
                    <button className="card-register">הירשם</button>
                </div>

                <div>
                    <h6 className="card-registered">כבר רשום?</h6>
                    <button className="card-login">היכנס</button>
                </div>
            </div>
        </div>
    );
}

export default Card;