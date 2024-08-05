import './Scoreboard.css';
import ActionBar from '../NavActBar';
import { useScoreboardLogic } from './ScoreboardLogic';

function Scoreboard() {
    const prop = useScoreboardLogic();

    return (
        <div className="scoreboard-container">
            <ActionBar />
            <h1>Scoreboard</h1>
            <table>
                <thead>
                <tr>
                    <th>Player</th>
                    <th>Score</th>
                </tr>
                </thead>
                <tbody>
                {prop.sortedPlayers.map(prop.createPlayerRow)}
                </tbody>
            </table>
            <button onClick={prop.handleBack}>Back</button>
        </div>
    );
}

export default Scoreboard;