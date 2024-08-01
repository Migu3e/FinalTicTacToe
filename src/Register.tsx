import X0pic from './assets/img.png'



function Card()
{
    return (
        <div className="card">
            <img className="card-image" src={X0pic} alt="TicTacImg"></img>
            <h2 className="card-title">TicTacToe</h2>
            <p className="card-text">Best TicTacToe</p>

            <div></div>

            <div>
                <button>הירשם</button>
            </div>
            <div>
                <button>היכנס</button>
            </div>


        </div>

    )
}

export default Card