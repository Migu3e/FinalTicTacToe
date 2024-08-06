import '../../assets/CSS/Scoreboard/Scoreboard.css';
import ActionBar from '../../components/navigation/NavActBar.tsx';
import { ScoreboardLogic } from './ScoreboardLogic.tsx';

function Table() {
    const prop = ScoreboardLogic();

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

export default Table;